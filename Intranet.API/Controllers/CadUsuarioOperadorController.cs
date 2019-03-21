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
using WebApi.OutputCache.V2;

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

        
        public IEnumerable<CadUsuarioOperador> GetAllByLoja(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadUsuariosOperadores.Where(x => x.IdUsuario == idUsuario).ToList();
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
                var Log = new CadUsuarioOperadorLog
                {
                    IdCadUsuOpe = obj.Id,
                    IdStatus = 8,
                    DataLog = DateTime.Now,
                    IdUsuario = obj.IdUsuario
                };
                context.CadUsuarioOperadorLogs.Add(Log);
                context.SaveChanges();
                emailService.SendEmail("vaniadp@smalvorada.com", "Nova Aprovação de Cadastro de Usuário - Pendente", emailService.BodySolicitacaoUsuario());
                emailService.SendEmail("escala@smalvorada.com", "Nova Aprovação de Cadastro de Usuário - Pendente", emailService.BodySolicitacaoUsuario());


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
            var result = context.CadUsuariosOperadores.Where(x => x.Id == obj.Id).FirstOrDefault();

            try
            {
                context.Entry(result).State = EntityState.Modified;
                result.IdStatus = 8;
                var Log = new CadUsuarioOperadorLog
                {
                    IdCadUsuOpe = obj.Id,
                    IdStatus = 8,
                    DataLog = DateTime.Now,
                    IdUsuario = obj.IdAprovador.Value
                };
                context.CadUsuarioOperadorLogs.Add(Log);
                context.SaveChanges();
                emailService.SendEmail("indicadores@smalvorada.com", "Novo Cadastro de Usuário - Pendente", emailService.BodySolicitacaoUsuario());
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
            var result = context.CadUsuariosOperadores.Where(x => x.Id == obj.Id).FirstOrDefault();

            try
            {
                context.Entry(result).State = EntityState.Modified;
                result.IdStatus = 9;
                var Log = new CadUsuarioOperadorLog
                {
                    IdCadUsuOpe = obj.Id,
                    IdStatus = 9,
                    DataLog = DateTime.Now,
                    IdUsuario = obj.IdAprovador.Value
                };
                context.CadUsuarioOperadorLogs.Add(Log);
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
            var result = context.CadUsuariosOperadores.Where(x => x.Id == obj.Id).FirstOrDefault();

            try
            {
                context.Entry(result).State = EntityState.Modified;
                result.IdStatus = 6;
                result.DataConclusao = DateTime.Now;
                var Log = new CadUsuarioOperadorLog
                {
                    IdCadUsuOpe = obj.Id,
                    IdStatus = 6,
                    DataLog = DateTime.Now,
                    IdUsuario = obj.IdAprovador.Value
                };
                context.CadUsuarioOperadorLogs.Add(Log);
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
