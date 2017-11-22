using Intranet.Application;
using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
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
using System.Data.Entity;

namespace Intranet.API.Controllers
{
    public class AlertaUltimoCustoController : ApiController
    {

        public IEnumerable<AlertaUltimoCusto> GetAll()
        {
            var context = new AlvoradaContext();

            return context.AlertasUltimoCusto.ToList();
        }

        public IEnumerable<AlertaUltimoCusto> GetUltimoCustoPorProduto(int cdProduto)
        {
            var context = new AlvoradaContext();

            return context.AlertasUltimoCusto.Where(x => x.CdProduto == cdProduto).ToList();
        }

        public HttpResponseMessage Alterar(AlertaUltimoCusto model)
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

        public IEnumerable<VwAlertaUltCustoAnalitico> GetAllAnalitico()
        {
            var context = new AlvoradaContext();

            return context.VwAlertasUltCustoAnalitico.OrderByDescending(x => x.Abertos).ToList();
        }
    }
}
