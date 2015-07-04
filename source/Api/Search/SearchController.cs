using System.Threading.Tasks;
using KlinkerSoft.Movies.Core.General;
using KlinkerSoft.Movies.Core.Search;
using Microsoft.AspNet.Mvc;

namespace Api.Search
{
    [Route("search")]
    public class SearchController : Controller
    {
        private readonly IInteractor<SearchRequest, SearchResponse> _interactor;

        public SearchController(IInteractor<SearchRequest, SearchResponse> interactor)
        {
            _interactor = interactor;
        }

        [HttpGet("{title}")]
        public async Task<IActionResult> Search(string title)
        {
            var request = new SearchRequest { Title = title };
            var response = await _interactor.Interact(request);
            return new ObjectResult(response);
        }
    }
}
