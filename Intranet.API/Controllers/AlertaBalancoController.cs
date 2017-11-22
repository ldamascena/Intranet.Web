using Intranet.Alvorada.Data.Context;
using Intranet.Application;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class AlertaBalancoController : ApiController
    {
        
        // GET: api/AlertaBalanco
        public IEnumerable<AlertaBalanco> GetAll()
        {
            var context = new AlvoradaContext();

            return context.AlertasBalanco.OrderByDescending(x => x.DtInclusao).ToList();
        }

        public HttpResponseMessage Incluir([FromBody] AlertaBalanco obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.Status = 0;
                obj.DtInclusao = DateTime.Now;
                context.AlertasBalanco.Add(obj);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // To do

        public HttpResponseMessage Aprovar([FromBody] AlertaBalanco obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.Status = 2;
                obj.DtConcluido = DateTime.Now;
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }


        public HttpResponseMessage Reprovar([FromBody] AlertaBalanco obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.Status = 1;
                obj.DtConcluido = DateTime.Now;
                context.Entry(obj).State = EntityState.Modified;
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
