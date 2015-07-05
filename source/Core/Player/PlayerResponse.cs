using System.IO;
using KlinkerSoft.Movies.Core.Domain;

namespace KlinkerSoft.Movies.Core.Player
{
    public class PlayerResponse
    {
        private readonly Movie _movie;

        public Stream Stream => _movie.GetStream();

        public string Extension => _movie.MovieType;

        public PlayerResponse(Movie movie)
        {
            _movie = movie;
        }
    }
}