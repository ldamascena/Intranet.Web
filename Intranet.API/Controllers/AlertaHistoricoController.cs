using Intranet.Application;
using Intranet.Data.Context;
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
    public class AlertaHistoricoController : ApiController
    {
        private CentralContext context;

        #region Repositories 

        private IAlertaHistoricoRepository _alertaHistoricoRepository;
        private IAlertaGeralRepository _alertaGeralRepository;
        private IAlertaInversaoRepository _alertaInversaoRepository;
        private IAlertaUltimoCustoRepository _alertaUltimoCustoRepository;
        private IAlertaManualRepository _alertaManualRepository;

        #endregion

        #region Services

        private IAlertaHistoricoService _alertaHistoricoService;

        #endregion

        #region App

        private IAlertaHistoricoApp _alertaHistoricoApp;

        #endregion

        #region Controllers Methods

        [HttpPost]
        public HttpResponseMessage CadastrarHistoricoManual([FromBody] AlertaHistorico obj)
        {
            context = new CentralContext();
            _alertaHistoricoRepository = new AlertaHistoricoRepository(context);
            _alertaGeralRepository = new AlertaGeralRepository(context);
            _alertaInversaoRepository = new AlertaInversaoRepository(context);
            _alertaUltimoCustoRepository = new AlertaUltimoCustoRepository(context);
            _alertaManualRepository = new AlertaManualRepository(context);
            _alertaHistoricoService = new AlertaHistoricoService(_alertaHistoricoRepository, _alertaInversaoRepository, _alertaGeralRepository, _alertaManualRepository, _alertaUltimoCustoRepository);
            _alertaHistoricoApp = new AlertaHistoricoApp(_alertaHistoricoService);
            try
            {
                _alertaHistoricoApp.CadastrarHistoricoManual(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage CadastrarHistoricosManual([FromBody] AlertaHistorico obj)
        {
            context = new CentralContext();
            _alertaHistoricoRepository = new AlertaHistoricoRepository(context);
            _alertaGeralRepository = new AlertaGeralRepository(context);
            _alertaInversaoRepository = new AlertaInversaoRepository(context);
            _alertaUltimoCustoRepository = new AlertaUltimoCustoRepository(context);
            _alertaManualRepository = new AlertaManualRepository(context);
            _alertaHistoricoService = new AlertaHistoricoService(_alertaHistoricoRepository, _alertaInversaoRepository, _alertaGeralRepository, _alertaManualRepository, _alertaUltimoCustoRepository);
            _alertaHistoricoApp = new AlertaHistoricoApp(_alertaHistoricoService);
            try
            {
                _alertaHistoricoApp.CadastrarHistoricosManual(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage CadastrarHistoricoInversao([FromBody] AlertaHistorico obj)
        {
            context = new CentralContext();
            _alertaHistoricoRepository = new AlertaHistoricoRepository(context);
            _alertaGeralRepository = new AlertaGeralRepository(context);
            _alertaInversaoRepository = new AlertaInversaoRepository(context);
            _alertaUltimoCustoRepository = new AlertaUltimoCustoRepository(context);
            _alertaManualRepository = new AlertaManualRepository(context);
            _alertaHistoricoService = new AlertaHistoricoService(_alertaHistoricoRepository, _alertaInversaoRepository, _alertaGeralRepository, _alertaManualRepository, _alertaUltimoCustoRepository);
            _alertaHistoricoApp = new AlertaHistoricoApp(_alertaHistoricoService);
            try
            {
                _alertaHistoricoApp.CadastrarHistoricoInversao(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage CadastrarHistoricosInversao([FromBody] AlertaHistorico obj)
        {
            context = new CentralContext();
            _alertaHistoricoRepository = new AlertaHistoricoRepository(context);
            _alertaGeralRepository = new AlertaGeralRepository(context);
            _alertaInversaoRepository = new AlertaInversaoRepository(context);
            _alertaUltimoCustoRepository = new AlertaUltimoCustoRepository(context);
            _alertaManualRepository = new AlertaManualRepository(context);
            _alertaHistoricoService = new AlertaHistoricoService(_alertaHistoricoRepository, _alertaInversaoRepository, _alertaGeralRepository, _alertaManualRepository, _alertaUltimoCustoRepository);
            _alertaHistoricoApp = new AlertaHistoricoApp(_alertaHistoricoService);
            try
            {
                _alertaHistoricoApp.CadastrarHistoricosInversao(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage CadastrarHistoricoUltimoCusto([FromBody] AlertaHistorico obj)
        {
            context = new CentralContext();
            _alertaHistoricoRepository = new AlertaHistoricoRepository(context);
            _alertaGeralRepository = new AlertaGeralRepository(context);
            _alertaInversaoRepository = new AlertaInversaoRepository(context);
            _alertaUltimoCustoRepository = new AlertaUltimoCustoRepository(context);
            _alertaManualRepository = new AlertaManualRepository(context);
            _alertaHistoricoService = new AlertaHistoricoService(_alertaHistoricoRepository, _alertaInversaoRepository, _alertaGeralRepository, _alertaManualRepository, _alertaUltimoCustoRepository);
            _alertaHistoricoApp = new AlertaHistoricoApp(_alertaHistoricoService);
            try
            {
                _alertaHistoricoApp.CadastrarHistoricoUltimoCusto(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage CadastrarHistoricosUltimoCusto([FromBody] AlertaHistorico obj)
        {
            context = new CentralContext();
            _alertaHistoricoRepository = new AlertaHistoricoRepository(context);
            _alertaGeralRepository = new AlertaGeralRepository(context);
            _alertaInversaoRepository = new AlertaInversaoRepository(context);
            _alertaUltimoCustoRepository = new AlertaUltimoCustoRepository(context);
            _alertaManualRepository = new AlertaManualRepository(context);
            _alertaHistoricoService = new AlertaHistoricoService(_alertaHistoricoRepository, _alertaInversaoRepository, _alertaGeralRepository, _alertaManualRepository, _alertaUltimoCustoRepository);
            _alertaHistoricoApp = new AlertaHistoricoApp(_alertaHistoricoService);
            try
            {
                _alertaHistoricoApp.CadastrarHistoricosUltimoCusto(obj);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        public IEnumerable<AlertaHistorico> GetHistoricoPorProduto(int cdProduto)
        {
            context = new CentralContext();
            _alertaHistoricoRepository = new AlertaHistoricoRepository(context);
            _alertaGeralRepository = new AlertaGeralRepository(context);
            _alertaInversaoRepository = new AlertaInversaoRepository(context);
            _alertaUltimoCustoRepository = new AlertaUltimoCustoRepository(context);
            _alertaManualRepository = new AlertaManualRepository(context);
            _alertaHistoricoService = new AlertaHistoricoService(_alertaHistoricoRepository, _alertaInversaoRepository, _alertaGeralRepository, _alertaManualRepository, _alertaUltimoCustoRepository);
            _alertaHistoricoApp = new AlertaHistoricoApp(_alertaHistoricoService);

            return _alertaHistoricoApp.ObterAlertasPorProdutoTipoAlerta(cdProduto).OrderByDescending(x => x.DataDoHistorico);
        }

        #endregion

    }
}

