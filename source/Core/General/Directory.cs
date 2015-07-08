using System.Collections.Generic;
using System.IO;

namespace KlinkerSoft.Movies.Core.General
{
    public interface IDirectory
    {
        IEnumerable<string> GetFiles(string directory, string searchPattern);
    }

    public class DirectoryService : IDirectory
    {
        public IEnumerable<string> GetFiles(string directory, string searchPattern)
        {
            return Directory.GetFiles(directory, searchPattern);
        }
    }
}
