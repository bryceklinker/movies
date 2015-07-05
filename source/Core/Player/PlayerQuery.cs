using System.Collections.Generic;
using System.Linq;
using KlinkerSoft.Movies.Core.Domain;
using KlinkerSoft.Movies.Core.Gateways;

namespace KlinkerSoft.Movies.Core.Player
{
    public class PlayerQuery : IQuery<Movie>
    {
        private readonly PlayerRequest _request;

        public PlayerQuery(PlayerRequest request)
        {
            _request = request;
        }

        public IEnumerable<Movie> Where(IEnumerable<Movie> enumerable)
        {
            return enumerable.Where(m => m.Title == _request.Title);
        }

        public IEnumerable<Movie> OrderBy(IEnumerable<Movie> enumerable)
        {
            return enumerable;
        }
    }
}
