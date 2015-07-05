using System.Collections.Generic;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.StaticFiles;
using Microsoft.Framework.DependencyInjection;

namespace KlinkerSoft.Movies.Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseDefaultFiles(new DefaultFilesOptions
            {
                DefaultFileNames = new List<string>
                {
                    "index.html"
                }
            });
            app.UseStaticFiles();
        }
    }
}
