using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class CadComposicaoController : ApiController
    {
        public IEnumerable<CadComposicaoControle> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadComposicoesControle.ToList();
        }

        public IEnumerable<CadComposicaoControle> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadComposicoesControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date == DateTime.Now.Date|| x.Baixa == true);
        }

        public HttpResponseMessage Incluir(CadComposicaoControle model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.CadComposicoesControle.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Editar(CadComposicaoControle model)
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

        public HttpResponseMessage Excluir([FromBody] CadComposicaoControle obj)
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

        public HttpResponseMessage Baixar(CadComposicaoControle model)
        {
            var context = new AlvoradaContext();

            try
            {
                model.Baixa = false;
                model.DataBaixa = DateTime.Now;
                context.Entry(model).State = EntityState.Modified;
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public decimal GetTotalByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadComposicoesControle.ToList()
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao.Date == DateTime.Now.Date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }

        public IEnumerable<CadComposicaoControle> GetAllByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadComposicoesControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date == date.Date);
        }

        public decimal GetTotalByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadComposicoesControle.ToList()
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao.Date == date.Date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }

        public IEnumerable<VwAcompanhamentoControleCaixa> GetAnalitcoByUser(int idUsuario, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            var result = context.VwAcompanhamentoControleCaixa.Where(x => x.IdUsuario == idUsuario
                && x.Data.Value >= dataInicio
                && x.Data.Value <= dataFim).Distinct().ToList().OrderBy(x => x.Data);

            return result;
        }
    }
}
