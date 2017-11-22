using Intranet.Application;
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

namespace Intranet.API.Controllers
{
    public class AlertaStatusController : ApiController
    {

        // GET: api/AlertaStatus
        public IEnumerable<AlertaStatus> GetAll()
        {
            var context = new AlvoradaContext();

            return context.AlertaStatus.ToList();
        }

        public IEnumerable<AlertaStatus> GetAllExceptNovo()
        {
            var context = new AlvoradaContext();

            return context.AlertaStatus.Where(x => x.nomeStatus != "Novo").ToList();
        }
    }
}
