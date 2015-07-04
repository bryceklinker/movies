using KlinkerSoft.Movies.Core;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;

namespace Api
{
    public class Startup
    {
        private readonly Configuration _configuration;
        private readonly IInitializer _coreInitializer;

        public Startup()
        {
            _configuration = new Configuration();
            _coreInitializer = new Initializer();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            _configuration.AddJsonFile("movies.json");
            services.AddSingleton<IConfiguration>(provider => _configuration);
            _coreInitializer.Initialize(services);
        }

        public void Configure(IApplicationBuilder app)
        {
            
        }
    }
}
