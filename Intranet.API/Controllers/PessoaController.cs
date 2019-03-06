using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Intranet.API.Controllers
{
    public class PessoaController : ApiController
    {
        
        // GET: api/Pessoa
        public IEnumerable<Pessoa> GetAll()
        {
            var context = new CentralContext();
            return context.Pessoas.Where(x => x.Morto == false);
        }
    }
}
