using KlinkerSoft.Movies.Core.Domain;

namespace KlinkerSoft.Movies.Api.Search
{
    public class MovieViewModel
    {
        public string Title { get; set; }
        public bool HasThumbnail { get; set; }
        public byte[] Thumbnail { get; set; }
    }

    public static class MovieViewModelExtensions
    {
        public static MovieViewModel AsViewModel(this Movie movie)
        {
            var thumbnail = movie.Thumbnail;
            return new MovieViewModel
            {
                Title = movie.Title,
                HasThumbnail = thumbnail.Length > 0,
                Thumbnail = thumbnail
            };
        }
    }
}
