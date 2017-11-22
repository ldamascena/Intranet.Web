using Intranet.Application;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Intranet.Alvorada.Data.Context;

namespace Intranet.API.Controllers
{
    public class AlertaHistoricoController : ApiController
    {
        private AlvoradaContext context;

        #region Controllers Methods

        public IEnumerable<AlertaHistorico> GetAll()
        {
            context = new AlvoradaContext();

            return context.AlertasHistorico.ToList();
        }

        public IEnumerable<AlertaHistorico> GetHistoricoByProdutoFilialTipoAlerta(int cdProduto, int cdPessoaFilial, int cdTipoAlerta)
        {
            context = new AlvoradaContext();

            return context.AlertasHistorico
                .Where(x => x.CdProduto == cdProduto && x.CdPessoaFilial == cdPessoaFilial && x.CdTipoAlerta == cdTipoAlerta)
                .OrderByDescending(x => x.DataDoHistorico)
                .ToList();
        }

        public HttpResponseMessage Incluir([FromBody] AlertaHistorico model)
        {
            context = new AlvoradaContext();

            try
            {
                model.DataDoHistorico = DateTime.Now;
                context.AlertasHistorico.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage IncluirTodos([FromBody] List<AlertaHistorico> models)
        {
            context = new AlvoradaContext();

            try
            {
                foreach (var item in models)
                {
                    item.DataDoHistorico = DateTime.Now;
                    context.AlertasHistorico.Add(item);
                    context.SaveChanges();
                }
                
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        #endregion
    }
}

