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
    public class CadAssProdLogController : ApiController
    {
        public IEnumerable<CadAssProdLog> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadAssProdLogs.ToList();
        }

        public IEnumerable<CadAssProdLog> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadAssProdLogs.Where(x => x.IdUsuario == idUsuario).ToList();
        }

        public IEnumerable<CadAssProdLog> GetAllByCadProd(int IdCadAssProd)
        {
            var context = new AlvoradaContext();

            return context.CadAssProdLogs.Where(x => x.IdCadAssProd == IdCadAssProd).ToList();
        }

        public HttpResponseMessage Incluir(CadAssProdLog obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DataLog = DateTime.Now;
                context.CadAssProdLogs.Add(obj);
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

        public HttpResponseMessage Excluir(CadAssProdLog obj)
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
