using KlinkerSoft.Movies.Universal.General.Messaging;
using KlinkerSoft.Movies.Universal.General.ViewModels;
using KlinkerSoft.Movies.Universal.Search.Messages;

namespace KlinkerSoft.Movies.Universal.Search.ViewModels
{
    public class SearchFormViewModel : ViewModelBase
    {
        private string _title;

        public string Title
        {
            get { return _title; }
            set
            {
                _title = value;
                RaisePropertyChanged(() => Title);
            }
        }
    }
}
