using Intranet.Alvorada.Data.Context;
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
    public class CadUsuarioOperadorLogController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadUsuarioOperadorLog> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadUsuarioOperadorLogs.ToList();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadUsuarioOperadorLog> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadUsuarioOperadorLogs.Where(x => x.IdUsuario == idUsuario).ToList();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadUsuarioOperadorLog> GetAllById(int IdUsuLog)
        {
            var context = new AlvoradaContext();

            return context.CadUsuarioOperadorLogs.Where(x => x.IdCadUsuOpe == IdUsuLog).ToList();
        }

        public HttpResponseMessage Incluir(CadUsuarioOperadorLog obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DataLog = DateTime.Now;
                context.CadUsuarioOperadorLogs.Add(obj);
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
