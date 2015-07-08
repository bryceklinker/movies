using System.Collections.Generic;
using System.Linq;
using KlinkerSoft.Movies.Core.Search;

namespace KlinkerSoft.Movies.Api.Search
{
    public class SearchResponseViewModel
    {
        public List<MovieViewModel> Movies { get; set; } 
    }

    public static class SearchResponseExtensions
    {
        public static SearchResponseViewModel AsViewModel(this SearchResponse response)
        {
            return new SearchResponseViewModel
            {
                Movies = response.Movies.Select(m => m.AsViewModel()).ToList()
            };
        }
    }
}
