using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace TicketManager
{
#pragma warning disable CS1591
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        // .ConfigureLogging((context, logging) =>
        // {
        //     logging.ClearProviders();
        //     logging.AddConfiguration(context.Configuration.GetSection("Logging"));
        //     logging.AddDebug();
        //     logging.AddConsole();
        // });
    }
#pragma warning restore CS1591
}
