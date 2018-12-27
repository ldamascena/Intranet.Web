using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class CadMotivoDespFilialController : ApiController
    {
        // GET: api/CadMotivoFilialDesp
        public IEnumerable<CadMotivoDespFilial> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadMotivoDespFiliais;
        }

        public HttpResponseMessage Incluir(CadMotivoDespFilial obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DataInclusao = DateTime.Now;
                context.CadMotivoDespFiliais.Add(obj);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Alterar(CadMotivoDespFilial obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Excluir(CadMotivoDespFilial obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = System.Data.Entity.EntityState.Deleted;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<dynamic>(HttpStatusCode.InternalServerError, new
                {
                    Error = ex.Message
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public CadMotivoDespFilial GetMotivoDespFilialByUser(int idMotivo, int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadMotivoDespFiliais.Where(x => x.IdMotivo == idMotivo && x.IdUsuario == idUsuario).FirstOrDefault();
        }
    }
}
