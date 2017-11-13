using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class SolParametroController : ApiController
    {
        public IEnumerable<SolParametro> GetAll()
        {
            var context = new CentralContext();

            return context.SolParametros.ToList();
        }

        public IEnumerable<SolParametro> GetAllSistemaInventario()
        {
            var context = new CentralContext();

            return context.SolParametros.Where(x => x.NmParametro == "SistemaInventario");
        }

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
