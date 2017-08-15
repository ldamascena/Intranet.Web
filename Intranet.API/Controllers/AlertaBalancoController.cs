using Intranet.Application;
using Intranet.Data.Context;
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

namespace Intranet.API.Controllers
{
    public class AlertaBalancoController : ApiController
    {
        private IAlertaBalancoRepository _repository;
        private IAlertaQuarentenaRepository _repositoryQuarentena;
        private IAlertaInversaoRepository _repositoryInversao;
        private IAlertaUltimoCustoRepository _repositoryUltimoCusto;
        private IAlertaHistoricoRepository _repositoryHistorico;
        private IAlertaGeralRepository _repositoryGeral;
        private IAlertaBalancoService _service;
        private IAlertaBalancoApp _app;

        // GET: api/AlertaBalanco
        public IEnumerable<AlertaBalanco> GetAll(int? situacao = null, DateTime? dataInclusao = null)
        {
            var context = new CentralContext();

            _repository = new AlertaBalancoRepository(context);
            _repositoryQuarentena = new AlertaQuarentenaRepository(context);
            _repositoryInversao = new AlertaInversaoRepository(context);
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(context);
            _repositoryHistorico = new AlertaHistoricoRepository(context);
            _repositoryGeral = new AlertaGeralRepository(context);
            _service = new AlertaBalancoService(_repository, _repositoryQuarentena, _repositoryInversao, _repositoryUltimoCusto, _repositoryHistorico, _repositoryGeral);
            _app = new AlertaBalancoApp(_service);

            return _app.GetAll(situacao, dataInclusao);
        }

        public IEnumerable<AlertaBalanco> GetBalancoContainsNomeProduto(string nomeProduto)
        {
            var context = new CentralContext();

            _repository = new AlertaBalancoRepository(context);
            _repositoryQuarentena = new AlertaQuarentenaRepository(context);
            _repositoryInversao = new AlertaInversaoRepository(context);
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(context);
            _repositoryHistorico = new AlertaHistoricoRepository(context);
            _repositoryGeral = new AlertaGeralRepository(context);
            _service = new AlertaBalancoService(_repository, _repositoryQuarentena, _repositoryInversao, _repositoryUltimoCusto, _repositoryHistorico, _repositoryGeral);
            _app = new AlertaBalancoApp(_service);

            return _app.GetBalancoContainsNomeProduto(nomeProduto);
        }

        public IEnumerable<AlertaBalanco> GetBalancoPorProduto(int cdProduto)
        {
            var context = new CentralContext();

            _repository = new AlertaBalancoRepository(context);
            _repositoryQuarentena = new AlertaQuarentenaRepository(context);
            _repositoryInversao = new AlertaInversaoRepository(context);
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(context);
            _repositoryHistorico = new AlertaHistoricoRepository(context);
            _repositoryGeral = new AlertaGeralRepository(context);
            _service = new AlertaBalancoService(_repository, _repositoryQuarentena, _repositoryInversao, _repositoryUltimoCusto, _repositoryHistorico, _repositoryGeral);
            _app = new AlertaBalancoApp(_service);

            return _app.GetBalancoPorProduto(cdProduto);
        }

        public HttpResponseMessage UpdateBalanco([FromBody] AlertaBalanco obj)
        {
            var context = new CentralContext();

            _repository = new AlertaBalancoRepository(context);
            _repositoryQuarentena = new AlertaQuarentenaRepository(context);
            _repositoryInversao = new AlertaInversaoRepository(context);
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(context);
            _repositoryHistorico = new AlertaHistoricoRepository(context);
            _repositoryGeral = new AlertaGeralRepository(context);
            _service = new AlertaBalancoService(_repository, _repositoryQuarentena, _repositoryInversao, _repositoryUltimoCusto, _repositoryHistorico, _repositoryGeral);
            _app = new AlertaBalancoApp(_service);

            try
            {
                _app.UpdateBalanco(obj);

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
