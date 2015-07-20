using System;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using KlinkerSoft.Movies.Universal.Annotations;

namespace KlinkerSoft.Movies.Universal.General.ViewModels
{
    public abstract class ViewModelBase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChangedInvocator]
        private void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        protected void RaisePropertyChanged<T>(Expression<Func<T>> property)
        {
            var memberExpression = (MemberExpression)property.Body;
            OnPropertyChanged(memberExpression.Member.Name);
        }
    }
}
