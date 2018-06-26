using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class CadUsuarioOperadorController : ApiController
    {
        public IEnumerable<CadUsuarioOperador> GetAll()
        {
            var context = new AlvoradaContext();

            var result = context.CadUsuariosOperadores.ToList();

            return result;
        }

        public CadUsuarioOperador Get(int id)
        {
            var context = new AlvoradaContext();

            var result = context.CadUsuariosOperadores.Where(x => x.Id == id).FirstOrDefault();

            return result;
        }

        public HttpResponseMessage Incluir([FromBody] CadUsuarioOperador obj)
        {

            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                obj.DataInclusao = DateTime.Now;
                obj.IdStatus = 1;
                context.CadUsuariosOperadores.Add(obj);
                context.SaveChanges();
                emailService.SendEmail("vaniadp@smalvorada.com", "Nova Aprovação de Cadastro de Usuário - Pendente", emailService.BodySolicitacaoUsuario());
                emailService.SendEmail("arquivo@smalvorada.com", "Nova Aprovação de Cadastro de Usuário - Pendente", emailService.BodySolicitacaoUsuario());
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

        public HttpResponseMessage Alterar([FromBody] CadUsuarioOperador obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
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

        public HttpResponseMessage Excluir([FromBody] CadUsuarioOperador obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Deleted;
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

        public HttpResponseMessage Aprovar([FromBody] CadUsuarioOperador obj)
        {

            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 8;
                context.SaveChanges();
                emailService.SendEmail("clima@smalvorada.com", "Novo Cadastro de Usuário - Pendente", emailService.BodySolicitacaoUsuario());
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

        public HttpResponseMessage Reprovar([FromBody] CadUsuarioOperador obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 9;
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

        public HttpResponseMessage Concluir([FromBody] CadUsuarioOperador obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 6;
                obj.DataConclusao = DateTime.Now;
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
    }
}
