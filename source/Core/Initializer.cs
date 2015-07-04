using KlinkerSoft.Movies.Core.Gateways;
using KlinkerSoft.Movies.Core.General;
using KlinkerSoft.Movies.Core.Models;
using KlinkerSoft.Movies.Core.Player;
using KlinkerSoft.Movies.Core.Search;
using Microsoft.Framework.DependencyInjection;

namespace KlinkerSoft.Movies.Core
{
    public interface IInitializer
    {
        void Initialize(IServiceCollection services);
    }

    public class Initializer : IInitializer
    {
        public void Initialize(IServiceCollection services)
        {
            services.AddTransient<IConfig, Config>();
            services.AddSingleton<IFile, FileService>();
            services.AddSingleton<IDirectory, DirectoryService>();
            services.AddTransient<IInteractor<PlayerRequest, PlayerResponse>, PlayerInteractor>();
            services.AddTransient<IInteractor<SearchRequest, SearchResponse>, SearchInteractor>();
            services.AddTransient<IGateway<Movie>, MovieGateway>();
        }
    }
}
