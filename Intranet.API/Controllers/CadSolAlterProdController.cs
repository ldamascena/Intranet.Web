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
    public class CadSolAlterProdController : ApiController
    {
        public IEnumerable<CadSolAlterProd> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadSolAlterProdutos.Take(500).OrderByDescending(x => x.Id).ToList();
        }

        public IEnumerable<CadSolAlterProd> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadSolAlterProdutos.Where(x => x.IdUsuario == idUsuario).ToList();
        }

        public HttpResponseMessage Incluir(CadSolAlterProd obj)
        {
            var context = new AlvoradaContext();
            var emailService = new EmailService();

            try
            {
                obj.DtInclusao = DateTime.Now;
                obj.IdStatus = 1;
                context.CadSolAlterProdutos.Add(obj);
                context.SaveChanges();
                emailService.SendEmail("indicador@smalvorada.com", "Nova Alteração de Produto - Pendente", emailService.BodySolicitacaoCadastro());
            }

            catch (Exception ex)
            {
                throw ex;
            }

            //catch (DbEntityValidationException e)
            //{
            //    foreach (var eve in e.EntityValidationErrors)
            //    {
            //        Console.WriteLine("Entidade do tipo \"{0}\" no estado \"{1}\" tem os seguintes erros de validação:",
            //            eve.Entry.Entity.GetType().Name, eve.Entry.State);
            //        foreach (var ve in eve.ValidationErrors)
            //        {
            //            Console.WriteLine("- Property: \"{0}\", Erro: \"{1}\"",
            //                ve.PropertyName, ve.ErrorMessage);
            //        }
            //    }
            //    throw;
            //}

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Excluir(CadSolAlterProd obj)
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

        public HttpResponseMessage Concluir(CadSolAlterProd obj)
        {
            var context = new AlvoradaContext();

            try
            {
                var result = context.CadSolAlterProdutos.Where(x => x.Id == obj.Id).FirstOrDefault();
                context.Entry(result).State = EntityState.Modified;
                result.IdStatus = 6;
                var log = new CadSolAlterProdLog
                {
                    DataLog = DateTime.Now,
                    IdSolAlterProd = obj.Id,
                    IdStatus = 6,
                    IdUsuario = obj.IdUsuario

                };
                context.CadSolAlterProdLogs.Add(log);
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
