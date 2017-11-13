using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class SolLogController : ApiController
    {
        public HttpResponseMessage Incluir(SolLog model)
        {
            var context = new CentralContext();

            try
            {
                model.cdUsuario = 74;
                model.cdDocumentoTipo = 0;
                model.txChave = "SistemaInventario";
                model.dtLog = DateTime.Now;
                model.nmUsuario = "Thiago Aguiar";
                model.VersaoAplicativo = 16;
                model.Estacao = "SRVALVORADA";
                model.dtInicio = DateTime.Now;

                context.SolLogs.Add(model);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
