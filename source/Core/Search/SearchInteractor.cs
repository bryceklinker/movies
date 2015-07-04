using System.Linq;
using System.Threading.Tasks;
using KlinkerSoft.Movies.Core.Gateways;
using KlinkerSoft.Movies.Core.General;
using KlinkerSoft.Movies.Core.Models;

namespace KlinkerSoft.Movies.Core.Search
{
    public class SearchInteractor : IInteractor<SearchRequest, SearchResponse>
    {
        private readonly IGateway<Movie> _movieGateway;

        public SearchInteractor(IGateway<Movie> movieGateway)
        {
            _movieGateway = movieGateway;
        }

        public Task<SearchResponse> Interact(SearchRequest request)
        {
            var query = new SearchQuery(request);
            var movies = _movieGateway.Query(query);
            var searchResponse = new SearchResponse
            {
                Movies = movies.ToList()
            };
            return Task.FromResult(searchResponse);
        }
    }
}
