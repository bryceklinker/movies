using System;
using System.Linq;
using System.Threading.Tasks;

namespace KlinkerSoft.Movies.Core.General
{
    public interface IUnitOfWork : IDisposable
    {
        IQueryable<T> Get<T>() where T : class;
        void Add<T>(T entity) where T : class;
        Task Commit();
    }
}
