using KlinkerSoft.Movies.Universal.General.Messaging;

namespace KlinkerSoft.Movies.Universal.Player.ViewModels
{
    public class PlayerViewModel
    {
        private readonly IMessageBus _messageBus;

        public PlayerViewModel()
            : this(MessageBus.Instance)
        {
            
        }

        public PlayerViewModel(IMessageBus messageBus)
        {
            _messageBus = messageBus;
        }
    }
}
