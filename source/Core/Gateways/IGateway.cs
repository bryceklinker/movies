using System.Collections.Generic;

namespace KlinkerSoft.Movies.Core.Gateways
{
    public interface IGateway<T>
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Query(IQuery<T> query);
    }
}
