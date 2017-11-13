using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Intranet.Domain.Entities;

namespace Intranet.API.Controllers
{
    public class SuperProdutoController : ApiController
    {
        // GET: api/SuperProduto
        public IEnumerable<SuperProduto> GetAll()
        {
            var context = new CentralContext();

            return context.SuperProdutos.ToList();
        }
    }
}
