using Intranet.Application;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using Intranet.Alvorada.Data.Context;

namespace Intranet.API.Controllers
{
    public class AlertaInversaoController : ApiController
    {
        
        // GET: api/AlertaInversao
        public IEnumerable<AlertaInversao> GetAll()
        {
            var context = new AlvoradaContext();

            return context.AlertasInversao.ToList();
        }

        public IEnumerable<AlertaInversao> GetInvertidosPorProduto(int cdProduto)
        {
            var context = new AlvoradaContext();

            return context.AlertasInversao.Where(x => x.CdProduto == cdProduto).ToList();
        }

        public HttpResponseMessage Alterar(AlertaInversao model)
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

        public HttpResponseMessage AlterarTodos(List<AlertaInversao> models)
        {
            var context = new AlvoradaContext();

            try
            {
                foreach (var item in models)
                {
                    context.Entry(item).State = EntityState.Modified;
                    context.SaveChanges();
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public IEnumerable<VwAlertaInversaoAnalitico> GetAllAnalitico()
        {
            var context = new AlvoradaContext();

            return context.VwAlertasInversaoAnalitico.OrderByDescending(x => x.Abertos).ToList();
        }
    }
}
