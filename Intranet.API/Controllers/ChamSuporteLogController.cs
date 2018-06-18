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
    public class ChamSuporteLogController : ApiController
    {
        public IEnumerable<ChamSuporteLog> GetAll()
        {
            var context = new AlvoradaContext();

            return context.ChamSuporteLogs.ToList();
        }

        public IEnumerable<ChamSuporteLog> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.ChamSuporteLogs.Where(x => x.IdUsuario == idUsuario).ToList();
        }

        public IEnumerable<ChamSuporteLog> GetAllByIdChamSuporte(int IdChamSuporte)
        {
            var context = new AlvoradaContext();

            return context.ChamSuporteLogs.Where(x => x.IdChamSuporte == IdChamSuporte).ToList();
        }

        public HttpResponseMessage Incluir(ChamSuporteLog obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DataLog = DateTime.Now;
                context.ChamSuporteLogs.Add(obj);
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
