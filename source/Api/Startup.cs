using System;
using System.IO;
using KlinkerSoft.Movies.Core;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Cors.Core;
using Microsoft.AspNet.Diagnostics;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace KlinkerSoft.Movies.Api
{
    public class Startup
    {
        private readonly Configuration _configuration;
        private readonly IInitializer _coreInitializer;

        public Startup()
        {
            _configuration = new Configuration(Directory.GetCurrentDirectory());
            _coreInitializer = new Initializer();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            _configuration.AddJsonFile("movies.json");
            _coreInitializer.Initialize(services, _configuration);

            services.AddMvc();
            services.AddCors();
            services.ConfigureCors(e => e.AddPolicy("default", CreateCorsPolicy()));
            services.ConfigureMvcJson(o => o.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseErrorPage(new ErrorPageOptions
            {
                SourceCodeLineCount = Int32.MaxValue
            });
            app.UseMvc();
        }

        private static CorsPolicy CreateCorsPolicy()
        {
            var policy = new CorsPolicy();
            policy.Headers.Add("*");
            policy.Methods.Add("*");
            policy.Origins.Add("*");
            policy.SupportsCredentials = true;
            return policy;
        }
    }
}
