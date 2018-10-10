using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class TesteController : ApiController
    {
        public IEnumerable<VwMixAbastecimentoPromo> GetAll() {
            var context = new CentralContext();

            return context.VwMixAbastecimentoPromo.Take(100);
        }
    }
}
