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
    public class CadAssProdController : ApiController
    {
        public IEnumerable<CadAssProd> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadAssProd.ToList();
        }

        public int? GetLastId()
        {
            var context = new AlvoradaContext();

            var result = context.CadAssProd.ToList();

            if (result.Count != 0)
            {
                return result.LastOrDefault().IdCadAssProd;
            }
            else
            {
                return null;
            }

        }

        public CadAssProd GetByIdCadAss(int idCadAss)
        {
            var context = new AlvoradaContext();

            return context.CadAssProd.Where(x => x.IdCadAssProd == idCadAss).FirstOrDefault();
        }

        public HttpResponseMessage Incluir(CadAssProd model)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                model.DataInclusao = DateTime.Now;
                context.CadAssProd.Add(model);
                context.SaveChanges();
                emailService.SendEmail("ldamascena@smalvorada.com", "Nova Associação de Produto - Pendente", emailService.BodyAssociacaoProduto());
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Alterar(CadAssProd model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.DataAlteracao = DateTime.Now;
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Excluir(CadAssProd model)
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

        public HttpResponseMessage Concluir(CadAssProd model)
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
    }
}
