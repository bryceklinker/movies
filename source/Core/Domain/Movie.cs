using System.IO;
using KlinkerSoft.Movies.Core.General;

namespace KlinkerSoft.Movies.Core.Domain
{
    public class Movie
    {
        private readonly string _filePath;
        private readonly IFile _file;

        public string Title => _file.GetFileName(_filePath);

        public string MovieType => _file.GetExtension(_filePath);

        public bool IsPlayable => true;

        public long Size => _file.GetFileSize(_filePath);

        public Movie(string filePath)
            : this(filePath, new FileService())
        {
        }

        public Movie(string filePath, IFile file)
        {
            _file = file;
            _filePath = filePath;
        }
        
        public Stream GetStream()
        {
            return _file.Open(_filePath);
        }
    }
}