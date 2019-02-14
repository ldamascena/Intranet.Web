using Intranet.Alvorada.Data.Context;
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
    public class GrupoController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<Grupo> GetAll()
        {
            var context = new AlvoradaContext();

            var result = context.Grupos.ToList();

            return result;
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public Grupo Get(int id)
        {
            var context = new AlvoradaContext();

            var result = context.Grupos.Where(x => x.Id == id).FirstOrDefault();

            return result;
        }

        public HttpResponseMessage Incluir([FromBody] Grupo obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Grupos.Add(obj);
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

        public HttpResponseMessage Alterar([FromBody] Grupo obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
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

        public HttpResponseMessage Excluir([FromBody] Grupo obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Deleted;
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
