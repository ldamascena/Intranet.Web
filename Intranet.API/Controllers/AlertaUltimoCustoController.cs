using Intranet.Application;
using Intranet.Data.Context;
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

namespace Intranet.API.Controllers
{
    public class AlertaUltimoCustoController : ApiController
    {
        private IAlertaUltimoCustoRepository _repository;
        private IAlertaUltimoCustoService _service;
        private IAlertaUltimoCustoApp _app;

        // GET: api/AlertaInversao
        //public IEnumerable<AlertaInversao> Get()
        //{
        //    _repository = new AlertaInversaoRepository(new CentralContext());
        //    _service = new AlertaInversaoService(_repository);
        //    _app = new AlertaInversaoApp(_service);
        //    return _app.ObterTodas();
        //}

        [HttpGet]
        public IEnumerable<AlertaUltimoCusto> GetUltimoCustoPorProduto(int cdProduto)
        {
            _repository = new AlertaUltimoCustoRepository(new CentralContext());
            _service = new AlertaUltimoCustoService(_repository);
            _app = new AlertaUltimoCustoApp(_service);

            return _app.GetAll().Where(x => x.CdProduto == cdProduto);
        }
    }
}
