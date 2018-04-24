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
    public class CadAssProdGradeController : ApiController
    {

        public HttpResponseMessage Incluir(CadAssProdGrade model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.CadAssProdGrade.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Alterar(CadAssProdGrade model)
        {
            var context = new AlvoradaContext();

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

        public HttpResponseMessage Excluir(CadAssProdGrade model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(model).State = EntityState.Deleted;
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
