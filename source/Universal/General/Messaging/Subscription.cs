using System;

namespace KlinkerSoft.Movies.Universal.General.Messaging
{
    public interface ISubscription : IDisposable
    {
        Guid Id { get; }
    }
    public interface ISubscription<in T> : ISubscription
    {
        void Handle(T message);
    }

    public class Subscription<T> : ISubscription<T>
    {
        private WeakReference<Action<T>> _reference; 

        public Guid Id { get; }

        public Subscription(Guid id, Action<T> action)
        {
            Id = id;
            _reference = new WeakReference<Action<T>>(action);
        }
        
        public void Handle(T message)
        {
            if (_reference == null)
                return;

            Action<T> handler;
            if (_reference.TryGetTarget(out handler))
                handler.Invoke(message);
        }

        public void Dispose()
        {
            _reference = null;
        }
    }
}
