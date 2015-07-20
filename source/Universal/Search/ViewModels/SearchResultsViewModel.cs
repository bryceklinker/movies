using KlinkerSoft.Movies.Universal.General.Messaging;

namespace KlinkerSoft.Movies.Universal.Search.ViewModels
{
    public class SearchResultsViewModel
    {
        private readonly IMessageBus _messageBus;

        public SearchResultsViewModel()
            : this(MessageBus.Instance)
        {
            
        }

        public SearchResultsViewModel(IMessageBus messageBus)
        {
            _messageBus = messageBus;
        }
    }
}
