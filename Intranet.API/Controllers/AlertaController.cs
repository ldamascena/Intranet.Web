using Intranet.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class AlertaController : ApiController
    {

        private readonly AlertaRepository _repository = new AlertaRepository(new CentralContext());
        // GET: api/Alert
        public IEnumerable<Alerta> Get()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        public HttpResponseMessage Cadastrar([FromBody] Alerta obj)
        {
            try
            {
                obj.DataDeCadastro = DateTime.Now;
                try
                {
                    _repository.Add(obj);
                }
                catch (Exception ex)
                {
                    return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new { Error = ex.Message });
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
