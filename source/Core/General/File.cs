using System.IO;

namespace KlinkerSoft.Movies.Core.General
{
    public interface IFile
    {
        string GetFileName(string filePath);
        long GetFileSize(string filePath);
        string GetExtension(string filePath);
        bool Exists(string filePath);
        Stream Open(string filePath);
    }

    public class FileService : IFile
    {
        public string GetFileName(string filePath)
        {
            return Path.GetFileNameWithoutExtension(filePath);
        }

        public long GetFileSize(string filePath)
        {
            return new FileInfo(filePath).Length;
        }

        public string GetExtension(string filePath)
        {
            return Path.GetExtension(filePath);
        }

        public bool Exists(string filePath)
        {
            return File.Exists(filePath);
        }

        public Stream Open(string filePath)
        {
            return File.OpenRead(filePath);
        }
    }
}
