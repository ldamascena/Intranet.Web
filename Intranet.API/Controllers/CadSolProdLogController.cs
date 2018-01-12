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
    public class CadSolProdLogController : ApiController
    {
        public IEnumerable<CadSolProdLog> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadSolProdLogs.ToList();
        }

        public IEnumerable<CadSolProdLog> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadSolProdLogs.Where(x => x.IdUsuario == idUsuario).ToList();
        }

        public IEnumerable<CadSolProdLog> GetAllByCadProd(int IdCadSolProd)
        {
            var context = new AlvoradaContext();

            return context.CadSolProdLogs.Where(x => x.IdCadSolProd == IdCadSolProd).ToList();
        }

        public HttpResponseMessage Incluir(CadSolProdLog obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DataLog = DateTime.Now;
                context.CadSolProdLogs.Add(obj);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
