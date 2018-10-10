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
    public class AlertaManualController : ApiController
    {
        //private IAlertaManualService _service;
        //private IAlertaManualRepository _repository;
        //private IAlertaManualApp _app;

        //public IEnumerable<AlertaManual> GetByProduto(int cdProduto)
        //{
        //    _repository = new AlertaManualRepository(new CentralContext());
        //    _service = new AlertaManualService(_repository);
        //    _app = new AlertaManualApp(_service);

        //    return _app.GetAll().Where(x => x.CdProduto == cdProduto).ToList();
        //}

        //[HttpPost]
        //public HttpResponseMessage IncluirAlerta([FromBody] AlertaManual obj)
        //{

        //    _repository = new AlertaManualRepository(new CentralContext());
        //    _service = new AlertaManualService(_repository);
        //    _app = new AlertaManualApp(_service);

        //    try
        //    {
        //        _app.IncluirAlerta(obj);

        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
        //    }

        //    return Request.CreateResponse(HttpStatusCode.OK);
        //}

        //public HttpResponseMessage AlterarAlerta([FromBody] AlertaManual obj)
        //{
        //    return Request.CreateResponse(HttpStatusCode.OK);
        //}
    }
}
