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
    public class AlertaTipoController : ApiController
    {
        private IAlertaTipoRepository _repositoryTipoAlerta;
        private IAlertaManualRepository _repositoryAlertaManual;
        private IAlertaTipoService _serviceTipoAlerta;
        private IAlertaTipoApp _appTipoAlerta;

        

        public IEnumerable<AlertaTipo> GetAll()
        {
            // Inicialização das instancias
            _repositoryTipoAlerta = new AlertaTipoRepository(new CentralContext());
            _repositoryAlertaManual = new AlertaManualRepository(new CentralContext());
            _serviceTipoAlerta = new AlertaTipoService(_repositoryTipoAlerta, _repositoryAlertaManual);
            _appTipoAlerta = new AlertaTipoApp(_serviceTipoAlerta);

            return _appTipoAlerta.GetAll();
        }

        public IEnumerable<AlertaTipo> GetAllAprovado()
        {
            // Inicialização das instancias
            _repositoryTipoAlerta = new AlertaTipoRepository(new CentralContext());
            _repositoryAlertaManual = new AlertaManualRepository(new CentralContext());
            _serviceTipoAlerta = new AlertaTipoService(_repositoryTipoAlerta, _repositoryAlertaManual);
            _appTipoAlerta = new AlertaTipoApp(_serviceTipoAlerta);

            return _appTipoAlerta.GetAll().Where(x => x.Aprovado == true);
        }

        public IEnumerable<AlertaTipo> GetByName(string nomeAlerta)
        {
            // Inicialização das instancias
            _repositoryTipoAlerta = new AlertaTipoRepository(new CentralContext());
            _repositoryAlertaManual = new AlertaManualRepository(new CentralContext());
            _serviceTipoAlerta = new AlertaTipoService(_repositoryTipoAlerta, _repositoryAlertaManual);
            _appTipoAlerta = new AlertaTipoApp(_serviceTipoAlerta);

            return _appTipoAlerta.GetAll().Where(x => x.NomeAlerta == nomeAlerta).ToList();
        }


        [HttpPost]
        public HttpResponseMessage IncluirAlertaTipo([FromBody] AlertaTipo obj)
        {
            // Inicialização das instancias
            _repositoryTipoAlerta = new AlertaTipoRepository(new CentralContext());
            _repositoryAlertaManual = new AlertaManualRepository(new CentralContext());
            _serviceTipoAlerta = new AlertaTipoService(_repositoryTipoAlerta, _repositoryAlertaManual);
            _appTipoAlerta = new AlertaTipoApp(_serviceTipoAlerta);

            try
            {
                _appTipoAlerta.IncluirTipoAlerta(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage AprovarTipoAlerta([FromBody] AlertaTipo obj)
        {
            // Inicialização das instancias
            _repositoryTipoAlerta = new AlertaTipoRepository(new CentralContext());
            _repositoryAlertaManual = new AlertaManualRepository(new CentralContext());
            _serviceTipoAlerta = new AlertaTipoService(_repositoryTipoAlerta, _repositoryAlertaManual);
            _appTipoAlerta = new AlertaTipoApp(_serviceTipoAlerta);

            try
            {
                _appTipoAlerta.AprovarTipoAlerta(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage VincularTipoAlerta([FromBody] List<AlertaTipo> objs)
        {
            // Inicialização das instancias
            _repositoryTipoAlerta = new AlertaTipoRepository(new CentralContext());
            _repositoryAlertaManual = new AlertaManualRepository(new CentralContext());
            _serviceTipoAlerta = new AlertaTipoService(_repositoryTipoAlerta, _repositoryAlertaManual);
            _appTipoAlerta = new AlertaTipoApp(_serviceTipoAlerta);

            try
            {
                _appTipoAlerta.VincularTipoAlerta(objs);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
