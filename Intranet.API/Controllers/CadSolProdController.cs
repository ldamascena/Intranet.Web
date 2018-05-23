using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
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

        public IEnumerable<CadSolProd> GetAllAproveByComercial()
        {
            var context = new AlvoradaContext();

            return context.CadSolProdutos.Where(x => x.IdStatus == 2).ToList();
        }

        public CadSolProd GetByID(int Id)
        {
            var context = new AlvoradaContext();

            return context.CadSolProdutos.Where(x => x.Id == Id).FirstOrDefault();
        }

        public int? GetLastId()
        {
            var context = new AlvoradaContext();

            var result = context.CadSolProdutos.ToList().LastOrDefault();

            if (result != null)
            {
                return result.IdCadSolProd;
            }
            else
            {
                return null;
            }

            
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
                emailService.SendEmail("marcelgestorcomercial@smalvorada.com", "Nova Aprovação de Cadastro de Produto - Pendente", emailService.BodySolicitacaoCadastro());
                //emailService.SendEmail("marcelgestorcomercial@smalvorda.com", "Aprovação de Cadastro de Produto - Pendente");
                //emailService.SendEmail("marcelgestorcomercial@smalvorada.com", "Nova Aprovação de Cadastro de Produto - Pendente");
            }


            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entidade do tipo \"{0}\" no estado \"{1}\" tem os seguintes erros de validação:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Erro: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }

            //catch (Exception ex)
            //{
            //    throw ex;
            //}

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
                emailService.SendEmail("viniciusbonifacio@smalvorada.com", "Nova Aprovação de Cadastro de Produto - Pendente", emailService.BodySolicitacaoCadastroDiretoria());
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
                emailService.SendEmail("indicador@smalvorada.com", "Novo Cadastro de Produto - Pendente", emailService.BodySolicitacaoCadastro());
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
