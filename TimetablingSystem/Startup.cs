using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TimetablingSystem.Startup))]
namespace TimetablingSystem
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
