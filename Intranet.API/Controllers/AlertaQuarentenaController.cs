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
    public class AlertaQuarentenaController : ApiController
    {
        private IAlertaQuarentenaRepository _repository;
        private IAlertaInversaoRepository _repositoryInversao;
        private IAlertaUltimoCustoRepository _repositoryUltimoCusto;
        private IAlertaHistoricoRepository _repositoryHistorico;
        private IAlertaQuarentenaService _service;
        private IAlertaQuarentenaApp _app;


        [HttpGet]
        // GET: api/AlertaQuarentena
        public IEnumerable<AlertaQuarentena> Get()
        {
            _repository = new AlertaQuarentenaRepository(new CentralContext());
            _repositoryInversao = new AlertaInversaoRepository(new CentralContext());
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(new CentralContext());
            _repositoryHistorico = new AlertaHistoricoRepository(new CentralContext());
            _service = new AlertaQuarentenaService(_repository, _repositoryInversao, _repositoryUltimoCusto, _repositoryHistorico);
            _app = new AlertaQuarentenaApp(_service);

            return _app.GetAll();
        }

        [HttpGet]
        // GET: api/AlertaQuarentena
        public IEnumerable<AlertaQuarentena> GetQuarentenaPorProduto(int cdProduto)
        {
            _repository = new AlertaQuarentenaRepository(new CentralContext());
            _repositoryInversao = new AlertaInversaoRepository(new CentralContext());
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(new CentralContext());
            _repositoryHistorico = new AlertaHistoricoRepository(new CentralContext());
            _service = new AlertaQuarentenaService(_repository, _repositoryInversao, _repositoryUltimoCusto, _repositoryHistorico);
            _app = new AlertaQuarentenaApp(_service);

            return _app.GetAll().Where(x => x.CdProduto == cdProduto);
        }


        [HttpPost]
        public HttpResponseMessage IncluirNaQuarentena([FromBody] AlertaQuarentena obj)
        {
            _repository = new AlertaQuarentenaRepository(new CentralContext());
            _repositoryInversao = new AlertaInversaoRepository(new CentralContext());
            _repositoryHistorico = new AlertaHistoricoRepository(new CentralContext());
            _service = new AlertaQuarentenaService(_repository, _repositoryInversao, _repositoryUltimoCusto, _repositoryHistorico);
            _app = new AlertaQuarentenaApp(_service);

            try
            {
                _app.IncluirNaQuarentena(obj);

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
