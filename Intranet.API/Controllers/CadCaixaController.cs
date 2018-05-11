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
    public class CadCaixaController : ApiController
    {
        public IEnumerable<CadCaixaControle> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadCaixasControle.ToList();
        }

        public IEnumerable<CadCaixaControle> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadCaixasControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date == DateTime.Now.Date);
        }

        public HttpResponseMessage Incluir(CadCaixaControle model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.CadCaixasControle.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Editar(CadCaixaControle model)
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

        public HttpResponseMessage Excluir([FromBody] CadCaixaControle obj)
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

        public decimal GetTotalByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadCaixasControle.ToList()
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao.Date == DateTime.Now.Date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }

        public IEnumerable<CadCaixaControle> GetAllByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadCaixasControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == date).ToList();
        }

        public decimal GetTotalByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadCaixasControle
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao == date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }
    }
}
