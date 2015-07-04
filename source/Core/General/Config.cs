using Microsoft.Framework.ConfigurationModel;

namespace KlinkerSoft.Movies.Core.General
{
    public interface IConfig
    {
        string GetSetting(string key);
    }

    public class Config : IConfig
    {
        private readonly IConfiguration _configuration;

        public Config(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetSetting(string key)
        {
            return _configuration.Get(key);
        }
    }
}
