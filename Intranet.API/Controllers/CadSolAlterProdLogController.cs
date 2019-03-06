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
    public class CadSolAlterProdLogController : ApiController
    {
        
        public IEnumerable<CadSolAlterProdLog> GetById(int id)
        {
            var context = new AlvoradaContext();

            return context.CadSolAlterProdLogs.Where(x => x.IdSolAlterProd == id).ToList();
        }

        public HttpResponseMessage Incluir(CadSolAlterProdLog obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DataLog = DateTime.Now;
                context.CadSolAlterProdLogs.Add(obj);
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
