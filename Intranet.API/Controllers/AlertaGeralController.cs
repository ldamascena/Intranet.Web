using Intranet.Application;
using Intranet.Solidcon.Data.Context;
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

namespace Intranet.API.Controllers
{
    public class AlertaGeralController : ApiController
    {

        private IAlertaGeralService _service;
        private IAlertaGeralRepository _repository;
        private IAlertaGeralApp _app;

        private IAlertaInversaoRepository _repositoryInversao;
        private IAlertaUltimoCustoRepository _repositoryUltimoCusto;

        //GET: api/AlertaGeral
        public IEnumerable<AlertaGeral> Get(int? tipoAlerta, int? situacao)
        {
            // Inicialização das instancias
            _repository = new AlertaGeralRepository(new CentralContext());
            _repositoryInversao = new AlertaInversaoRepository(new CentralContext());
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(new CentralContext());
            _service = new AlertaGeralService(_repository, _repositoryInversao, _repositoryUltimoCusto);
            _app = new AlertaGeralApp(_service);

            return _app.Get(tipoAlerta, situacao).OrderByDescending(x => x.Severidade);
        }

        public IEnumerable<AlertaGeral> GetContainsNomeProduto(string nomeProduto)
        {
            // Inicialização das instancias
            _repository = new AlertaGeralRepository(new CentralContext());
            _repositoryInversao = new AlertaInversaoRepository(new CentralContext());
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(new CentralContext());
            _service = new AlertaGeralService(_repository, _repositoryInversao, _repositoryUltimoCusto);
            _app = new AlertaGeralApp(_service);

            return _app.GetAll().Where(x => x.NomeProduto.Contains(nomeProduto.ToUpper())).OrderByDescending(x => x.Severidade);
        }

        public IEnumerable<AlertaGeral> GetGeralPorProduto(int cdProduto)
        {
            _repository = new AlertaGeralRepository(new CentralContext());
            _repositoryInversao = new AlertaInversaoRepository(new CentralContext());
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(new CentralContext());
            _service = new AlertaGeralService(_repository, _repositoryInversao, _repositoryUltimoCusto);
            _app = new AlertaGeralApp(_service);

            return _app.GetAll().Where(x => x.CdProduto == cdProduto).ToList();
        }

        public AlertaGeral GetGeralPorProdutoNome(string nomeProduto)
        {
            _repository = new AlertaGeralRepository(new CentralContext());
            _repositoryInversao = new AlertaInversaoRepository(new CentralContext());
            _repositoryUltimoCusto = new AlertaUltimoCustoRepository(new CentralContext());
            _service = new AlertaGeralService(_repository, _repositoryInversao, _repositoryUltimoCusto);
            _app = new AlertaGeralApp(_service);

            return _app.GetGeralPorProdutoNome(nomeProduto);
        }

        public IEnumerable<VwAlertasAnalitico> GetAllAnalitico()
        {
            var context = new CentralContext();

            return context.VwAlertasAnalitico.OrderByDescending(x => x.Severidade).ToList();
        }
    }
}
