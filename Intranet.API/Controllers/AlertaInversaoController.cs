﻿using Intranet.Application;
using Intranet.Data.Context;
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

namespace Intranet.API.Controllers
{
    public class AlertaInversaoController : ApiController
    {
        private IAlertaInversaoRepository _repository;
        private IAlertaInversaoService _service;
        private IAlertaInversaoApp _app;

        // GET: api/AlertaInversao
        public IEnumerable<AlertaInversao> Get()
        {
            _repository = new AlertaInversaoRepository(new CentralContext());
            _service = new AlertaInversaoService(_repository);
            _app = new AlertaInversaoApp(_service);
            return _app.GetAll();
        }

        [HttpGet]
        public IEnumerable<AlertaInversao> GetInvertidosPorProduto(int cdProduto)
        {
            _repository = new AlertaInversaoRepository(new CentralContext());
            _service = new AlertaInversaoService(_repository);
            _app = new AlertaInversaoApp(_service);

            return _app.ObterPorProduto(cdProduto);
        }
    }
}
