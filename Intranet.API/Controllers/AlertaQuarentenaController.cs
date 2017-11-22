using Intranet.Application;
using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Intranet.Alvorada.Data.Context;

namespace Intranet.API.Controllers
{
    public class AlertaQuarentenaController : ApiController
    {
        public IEnumerable<AlertaQuarentena> GetAll()
        {
            var context = new AlvoradaContext();

            return context.AlertasQuarentena.ToList();
        }

        public HttpResponseMessage Incluir(AlertaQuarentena model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.Dias = 30;
                model.DtInclusao = DateTime.Now;
                model.DtSaida = DateTime.Now.AddDays(model.Dias);
                context.AlertasQuarentena.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage IncluirTodos(List<AlertaQuarentena> models)
        {
            var context = new AlvoradaContext();

            try
            {
                foreach (var item in models)
                {
                    item.Dias = 30;
                    item.DtInclusao = DateTime.Now;
                    item.DtSaida = DateTime.Now.AddDays(item.Dias);
                    context.AlertasQuarentena.Add(item);
                    context.SaveChanges();
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
