using Intranet.Application;
using Intranet.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Applications;
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

        // GET: api/AlertaGeral
        public IEnumerable<AlertaGeral> Get()
        {
            // Inicialização das instancias
            _repository = new AlertaGeralRepository(new CentralContext());
            _service = new AlertaGeralService(_repository);
            _app = new AlertaGeralApp(_service);

            return _app.ObterTodas().OrderByDescending(x => x.Severidade);
        }
    }
}
