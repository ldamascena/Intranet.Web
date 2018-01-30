using Intranet.Application;
using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class ViewProdutoController : ApiController
    {
        // GET: api/ViewProduto
        public IEnumerable<string> GetAll()
        {
            var context = new CentralContext();

            return context.VwProdutoEAN.Select(x => x.Produto).ToList().Distinct();
        }

        public VwProdutoEAN GetByEAN(long Ean)
        {
            var context = new CentralContext();

            return context.VwProdutoEAN.Where(x => x.CdEAN == Ean).FirstOrDefault();
        }

        public IEnumerable<VwEmbalagensProdutoEAN> GetEmbalagensByEAN(long Ean)
        {
            var context = new CentralContext();

            return context.VwEmbalagensProdutoEAN.Where(x => x.CdEAN == Ean).ToList();
        }
    }
}
