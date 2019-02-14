using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Intranet.API.Controllers
{
    public class SolParametroController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<SolParametro> GetAll()
        {
            var context = new CentralContext();

            return context.SolParametros.ToList();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<SolParametro> GetAllSistemaInventario()
        {
            var context = new CentralContext();

            return context.SolParametros.Where(x => x.NmParametro == "SistemaInventario");
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public SolParametro GetAllSistemaInventarioByLoja(int idLoja)
        {
            var context = new CentralContext();

            return context.SolParametros.Where(x => x.NmParametro == "SistemaInventario" && x.CdPessoaFilial == idLoja).FirstOrDefault();
        }

        public HttpResponseMessage Editar(SolParametro model)
        {
            var context = new CentralContext();

            try
            {
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
