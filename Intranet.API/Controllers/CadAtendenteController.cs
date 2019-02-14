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
    public class CadAtendenteController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadAtendente> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadAtendentes.Where(x => x.Bloqueado == false).ToList();
        }

        public HttpResponseMessage Incluir(CadAtendente model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataInclusao = DateTime.Now;
                context.CadAtendentes.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Editar(CadAtendente model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataAlteracao = DateTime.Now;
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Bloquear(CadAtendente model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataBloqueio = DateTime.Now;
                model.DataAlteracao = DateTime.Now;
                model.Bloqueado = true;
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Desbloquear(CadAtendente model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataAlteracao = DateTime.Now;
                model.Bloqueado = false;
                context.Entry(model).State = EntityState.Modified;
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
