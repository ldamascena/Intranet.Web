using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class CadFornecedorDespController : ApiController
    {
        public IEnumerable<CadFornecedorDesp> GetAll()
        {
            var context = new AlvoradaContext();

            var result = context.CadFornecedoresDesp.ToList();

            return result;
        }


        public CadFornecedorDesp Get(int id)
        {
            var context = new AlvoradaContext();

            var result = context.CadFornecedoresDesp.Where(x => x.Id == id).FirstOrDefault();

            return result;
        }

        public HttpResponseMessage Incluir([FromBody] CadFornecedorDesp obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.CadFornecedoresDesp.Add(obj);
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

        public HttpResponseMessage Alterar([FromBody] CadFornecedorDesp obj)
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
    }
}
