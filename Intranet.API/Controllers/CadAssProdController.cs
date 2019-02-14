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
    public class CadAssProdController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadAssProd> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadAssProd.Take(500).OrderByDescending(x => x.Id).ToList();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadAssProd> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadAssProd.Where(x => x.IdUsuario == idUsuario).ToList();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public int GetLastId()
        {
            var context = new AlvoradaContext();
            var result = context.CadAssProd.ToList().LastOrDefault().IdCadAssProd;

            return result;

        }

        [CacheOutput(ServerTimeSpan = 120)]
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
                emailService.SendEmail("indicador@smalvorada.com", "Nova Associação de Produto - Pendente", emailService.BodyAssociacaoProduto());
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
            var result = context.CadAssProd.Where(x => x.Id == model.Id).FirstOrDefault();

            try
            {
                result.IdStatus = model.IdStatus;
                result.Observacao = model.Observacao;
                context.Entry(result).State = EntityState.Modified;
                var log = new CadAssProdLog
                {
                    DataLog = DateTime.Now,
                    IdStatus = model.IdStatus,
                    IdCadAssProd = model.Id,
                    IdUsuario = model.IdUsuario
                };
                context.CadAssProdLogs.Add(log);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public IEnumerable<VwAssociacoesConcluidas> GetAllConcluidas()
        {
            var context = new AlvoradaContext();

            return context.VwAssociacoesConcluidas;
        }

        public IEnumerable<string> Usuarios()
        {
            //string meses, int anos
            var context = new AlvoradaContext();

            return context.VwAssociacoesConcluidas.Select(x => x.Usuario).ToList().Distinct();

            //return context.VwAssociacoesConcluidas.Where(x => x.NOME_MES.Contains(meses) && x.ANO.ToString().Contains(anos.ToString())).Select(x => x.Usuario).ToList();
        }
    }
}
