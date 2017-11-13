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

namespace Intranet.API.Controllers
{
    public class AlertaStatusController : ApiController
    {
        private IAlertaStatusRepository _repositoryStatusAlerta;
        private IAlertaStatusService _serviceStatusAlerta;
        private IAlertaStatusApp _appStatusAlerta;

        // GET: api/AlertaStatus
        public IEnumerable<AlertaStatus> Get()
        {
            _repositoryStatusAlerta = new AlertaStatusRepository(new CentralContext());
            _serviceStatusAlerta = new AlertaStatusService(_repositoryStatusAlerta);
            _appStatusAlerta = new AlertaStatusApp(_serviceStatusAlerta);

            return _appStatusAlerta.GetAll();
        }

        public IEnumerable<AlertaStatus> GetExceptNovo()
        {
            _repositoryStatusAlerta = new AlertaStatusRepository(new CentralContext());
            _serviceStatusAlerta = new AlertaStatusService(_repositoryStatusAlerta);
            _appStatusAlerta = new AlertaStatusApp(_serviceStatusAlerta);

            return _appStatusAlerta.GetAll().Skip(1);
        }
    }
}
