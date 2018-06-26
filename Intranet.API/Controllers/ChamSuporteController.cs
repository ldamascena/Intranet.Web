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
    public class ChamSuporteController : ApiController
    {
        public IEnumerable<ChamSuporte> GetAll()
        {
            var context = new AlvoradaContext();
            return context.ChamadosSuporte;
        }

        public HttpResponseMessage Incluir(ChamSuporte model)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                model.DataInclusao = DateTime.Now;
                context.ChamadosSuporte.Add(model);
                context.SaveChanges();
                //emailService.SendEmail("indicador@smalvorada.com", "Nova Associação de Produto - Pendente", emailService.BodyAssociacaoProduto());
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Alterar(ChamSuporte model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Excluir(ChamSuporte model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(model).State = EntityState.Deleted;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Concluir(ChamSuporte model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(model).State = EntityState.Modified;
                model.IdStatus = 6;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public IEnumerable<ChamSuporteAssunto> GetAssuntos()
        {
            var context = new AlvoradaContext();

            return context.ChamadosSuporteAssuntos;
        }

        public HttpResponseMessage IncluirAssunto(ChamSuporteAssunto model)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                context.ChamadosSuporteAssuntos.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AlterarAssunto(ChamSuporteAssunto model)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                context.Entry(model).State = EntityState.Modified;
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
