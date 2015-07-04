using System.Linq;
using System.Threading.Tasks;
using KlinkerSoft.Movies.Core.Gateways;
using KlinkerSoft.Movies.Core.General;
using KlinkerSoft.Movies.Core.Models;

namespace KlinkerSoft.Movies.Core.Player
{
    public class PlayerInteractor : IInteractor<PlayerRequest, PlayerResponse>
    {
        private readonly IGateway<Movie> _movieGateway;

        public PlayerInteractor(IGateway<Movie> movieGateway)
        {
            _movieGateway = movieGateway;
        }

        public Task<PlayerResponse> Interact(PlayerRequest request)
        {
            var query = new PlayerQuery(request);
            var movie = _movieGateway.Query(query).Single();
            var response = new PlayerResponse(movie);
            return Task.FromResult(response);
        }
    }
}
