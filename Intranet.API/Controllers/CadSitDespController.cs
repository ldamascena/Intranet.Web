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
    public class CadSitDespController : ApiController
    {
        
        // GET: api/CadMotivoDesp
        public IEnumerable<CadSitDesp> GetAll()
        {
            var context = new AlvoradaContext();

            var result = context.CadSituacoesDesp.ToList();

            return result;
        }

        
        public CadSitDesp Get(int id)
        {
            var context = new AlvoradaContext();

            var result = context.CadSituacoesDesp.Where(x => x.IdSit == id).FirstOrDefault();

            return result;
        }

        public HttpResponseMessage Incluir([FromBody] CadSitDesp obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.CadSituacoesDesp.Add(obj);
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

        public HttpResponseMessage Alterar([FromBody] CadSitDesp obj)
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

        public HttpResponseMessage Excluir([FromBody] CadSitDesp obj)
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
