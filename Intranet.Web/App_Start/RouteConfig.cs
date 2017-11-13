using Intranet.Application;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Intranet.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default",                                              
                "{controller}/{action}/{id}",                           
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }  
            );
        }
    }
}
