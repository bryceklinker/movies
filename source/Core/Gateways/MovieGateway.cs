using System.Collections.Generic;
using System.Linq;
using KlinkerSoft.Movies.Core.General;
using KlinkerSoft.Movies.Core.Models;

namespace KlinkerSoft.Movies.Core.Gateways
{
    public class MovieGateway : IGateway<Movie>
    {
        private readonly string _movieDirectory;
        private readonly IDirectory _directory;
        
        public MovieGateway(IConfig config, IDirectory directory)
        {
            _directory = directory;
            _movieDirectory = config.GetSetting("movies:directory");
        }

        public IEnumerable<Movie> GetAll()
        {
            return _directory.GetFiles(_movieDirectory)
                .Select(f => new Movie(f));
        }

        public IEnumerable<Movie> Query(IQuery<Movie> query)
        {
            var movies = GetAll();
            movies = query.Where(movies);
            movies = query.OrderBy(movies);
            return movies;
        }
    }
}
