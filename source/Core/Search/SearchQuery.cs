using System.Collections.Generic;
using System.Linq;
using KlinkerSoft.Movies.Core.Gateways;
using KlinkerSoft.Movies.Core.Models;

namespace KlinkerSoft.Movies.Core.Search
{
    public class SearchQuery : IQuery<Movie>
    {
        private readonly SearchRequest _request;

        public SearchQuery(SearchRequest request)
        {
            _request = request;
        }

        public IEnumerable<Movie> Where(IEnumerable<Movie> enumerable)
        {
            return enumerable.Where(m => m.Title.ToLowerInvariant().Contains(_request.Title.ToLowerInvariant()));
        }

        public IEnumerable<Movie> OrderBy(IEnumerable<Movie> enumerable)
        {
            return enumerable.OrderBy(m => m.Title);
        }
    }
}
