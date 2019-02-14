using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
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
    public class CadMotivoDespController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        // GET: api/CadMotivoDesp
        public IEnumerable<CadMotivoDesp> GetAll()
        {
            var context = new AlvoradaContext();

            var result = context.CadMotivosDesp.ToList();

            return result;
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public CadMotivoDesp Get(int id)
        {
            var context = new AlvoradaContext();

            var result = context.CadMotivosDesp.Where(x => x.IdMotivo == id).FirstOrDefault();

            return result;
        }

        public HttpResponseMessage Incluir([FromBody] CadMotivoDesp obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.CadMotivosDesp.Add(obj);
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

        public HttpResponseMessage Alterar([FromBody] CadMotivoDesp obj)
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

        public HttpResponseMessage Excluir([FromBody] CadMotivoDesp obj)
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
