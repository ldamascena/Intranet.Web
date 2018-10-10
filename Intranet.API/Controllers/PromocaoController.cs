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
    public class PromocaoController : ApiController
    {
        public IEnumerable<Promocao> GetAllAtivas()
        {
            var context = new CentralContext();

            DateTime currentDate = DateTime.Now.Date;

            return context.Promocoes.Where(x => x.inAtiva == true && x.dtFim >= currentDate && (x.cdTipoPromocao.Value == 1 || x.cdTipoPromocao.Value == 5));
        }
    }
}
