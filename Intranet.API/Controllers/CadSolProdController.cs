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
    public class CadSolProdController : ApiController
    {

        public IEnumerable<CadSolProd> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadSolProdutos.ToList();
        }

        public IEnumerable<CadSolProd> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadSolProdutos.Where(x => x.IdUsuario == idUsuario).ToList();
        }

        public int GetLastId()
        {
            var context = new AlvoradaContext();

            return context.CadSolProdutos.ToList().LastOrDefault().IdCadSolProd;
        }

        public HttpResponseMessage Incluir([FromBody] CadSolProd obj)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                obj.IdStatus = 1;
                obj.DataCriacao = DateTime.Now;
                context.CadSolProdutos.Add(obj);
                context.SaveChanges();
                emailService.SendEmail("ldamascena@smalvorada.com", "Nova Aprovação de Cadastro de Produto - Pendente");
                //emailService.SendEmail("marcelgestorcomercial@smalvorda.com", "Aprovação de Cadastro de Produto - Pendente");
                //emailService.SendEmail("marcelgestorcomercial@smalvorada.com", "Nova Aprovação de Cadastro de Produto - Pendente");
            }

            catch(Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Editar([FromBody] CadSolProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Excluir(CadSolProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Deleted;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AprovarComercial(CadSolProd obj)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 2;
                context.SaveChanges();
                //emailService.SendEmail("viniciusbonifacio@smalvorda.com", "Aprovação de Cadastro de Produto - Pendente");
                emailService.SendEmail("ldamascena@smalvorada.com", "Nova Aprovação de Cadastro de Produto - Pendente");
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ReprovarComercial(CadSolProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 3;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AprovarDiretoria(CadSolProd obj)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 4;
                context.SaveChanges();
                //emailService.SendEmail("viniciusbonifacio@smalvorda.com", "Cadastro de Produto - Pendente");
                emailService.SendEmail("ldamascena@smalvorada.com", "Novo Cadastro de Produto - Pendente");
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ReprovarDiretoria(CadSolProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 5;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Concluir(CadSolProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdStatus = 6;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Lock(CadSolProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Unlock(CadSolProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.Entry(obj).State = EntityState.Modified;
                obj.IdUserLock = null;
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
