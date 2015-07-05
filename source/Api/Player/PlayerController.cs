using System.Threading.Tasks;
using KlinkerSoft.Movies.Core.General;
using KlinkerSoft.Movies.Core.Player;
using Microsoft.AspNet.Mvc;

namespace KlinkerSoft.Movies.Api.Player
{
    [Route("play")]
    public class PlayerController : Controller
    {
        private readonly IInteractor<PlayerRequest, PlayerResponse> _interactor;

        public PlayerController(IInteractor<PlayerRequest, PlayerResponse> interactor)
        {
            _interactor = interactor;
        }

        [HttpGet("{title}")]
        public async Task<IActionResult> Play(string title)
        {
            var request = new PlayerRequest { Title = title };
            var response = await _interactor.Interact(request);
            return new FileStreamResult(response.Stream, "video/" + response.Extension);
        }
    }
}
