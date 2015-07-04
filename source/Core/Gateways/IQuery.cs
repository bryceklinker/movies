using System.Collections.Generic;

namespace KlinkerSoft.Movies.Core.Gateways
{
    public interface IQuery<T>
    {
        IEnumerable<T> Where(IEnumerable<T> enumerable);
        IEnumerable<T> OrderBy(IEnumerable<T> enumerable);
    }
}
