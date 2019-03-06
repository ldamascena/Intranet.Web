using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Intranet.API.Controllers
{
    public class CargaController : ApiController
    {
        
        public IEnumerable<Carga> GetAll()
        {
            var context = new CentralContext();

            return context.Cargas.ToList();
        }
    }
}
