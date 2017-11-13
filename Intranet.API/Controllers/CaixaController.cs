using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class CaixaController : ApiController
    {
        public IEnumerable<Caixa> GetAll()
        {
            var context = new AlvoradaContext();

            return context.Caixas.ToList();
        }
    }
}
