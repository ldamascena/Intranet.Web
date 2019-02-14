using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Intranet.API.Controllers
{
    public class CaixaController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<Caixa> GetAll()
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            return context.Caixas.ToList();
        }
    }
}
