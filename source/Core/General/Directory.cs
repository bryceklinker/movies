using System.Collections.Generic;
using System.IO;

namespace KlinkerSoft.Movies.Core.General
{
    public interface IDirectory
    {
        IEnumerable<string> GetFiles(string directory);
    }

    public class DirectoryService : IDirectory
    {
        public IEnumerable<string> GetFiles(string directory)
        {
            return Directory.GetFiles(directory);
        }
    }
}
