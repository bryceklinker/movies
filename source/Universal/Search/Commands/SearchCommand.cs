using System;
using System.Windows.Input;
using KlinkerSoft.Movies.Universal.General.Messaging;
using KlinkerSoft.Movies.Universal.Search.Messages;

namespace KlinkerSoft.Movies.Universal.Search.Commands
{
    public class SearchCommand : ICommand
    {
        private readonly IMessageBus _messageBus;

        public SearchCommand()
            : this(MessageBus.Instance)
        {
            
        }

        public SearchCommand(IMessageBus messageBus)
        {
            _messageBus = messageBus;
        }

        public bool CanExecute(object parameter)
        {
            var title = parameter as string;
            return !string.IsNullOrWhiteSpace(title);
        }

        public void Execute(object parameter)
        {
            var message = new SearchMessage(parameter as string);
            _messageBus.Publish(message);
        }

        public event EventHandler CanExecuteChanged;
    }
}
