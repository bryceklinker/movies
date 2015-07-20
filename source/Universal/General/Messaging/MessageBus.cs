using System;
using System.Collections.Generic;
using System.Linq;

namespace KlinkerSoft.Movies.Universal.General.Messaging
{
    public interface IMessageBus : IDisposable
    {
        void Publish<T>(T message);
        ISubscription<T> Subscribe<T>(Action<T> handler);
        void Unsubscribe<T>(ISubscription<T> subscription);
        void Unsubscribe(Guid id);
    }

    public class MessageBus : IMessageBus
    {
        private static readonly Lazy<MessageBus> LazyInstance = new Lazy<MessageBus>(() => new MessageBus()); 
        private readonly List<ISubscription> _subscriptions;

        public static IMessageBus Instance { get; } = LazyInstance.Value;

        public MessageBus()
        {
            _subscriptions = new List<ISubscription>();
        }

        public void Publish<T>(T message)
        {
            foreach (var subscription in _subscriptions)
            {
                var sub = subscription as ISubscription<T>;
                sub?.Handle(message);
            }
        }

        public ISubscription<T> Subscribe<T>(Action<T> handler)
        {
            var subscription = new Subscription<T>(Guid.NewGuid(), handler);
            _subscriptions.Add(subscription);
            return subscription;
        }

        public void Unsubscribe<T>(ISubscription<T> subscription)
        {
            _subscriptions.Remove(subscription);
            subscription.Dispose();
        }

        public void Unsubscribe(Guid id)
        {
            var subscription = _subscriptions.SingleOrDefault(s => s.Id == id);
            _subscriptions.Remove(subscription);
            subscription.Dispose();
        }

        public void Dispose()
        {
            foreach (var subscription in _subscriptions)
                subscription.Dispose();
            _subscriptions.Clear();
        }
    }
}
