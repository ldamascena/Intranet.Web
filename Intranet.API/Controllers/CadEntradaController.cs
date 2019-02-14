using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
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
    public class CadEntradaController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadEntradaControle> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadEntradasControle.ToList();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadEntradaControle> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadEntradasControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date == DateTime.Now.Date);
        }

        public HttpResponseMessage Incluir(CadEntradaControle model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.CadEntradasControle.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Editar(CadEntradaControle model)
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

        public HttpResponseMessage Excluir([FromBody] CadEntradaControle obj)
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

        [CacheOutput(ServerTimeSpan = 120)]
        public decimal GetTotalByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadEntradasControle.ToList()
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao.Date == DateTime.Now.Date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadEntradaControle> GetAllByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadEntradasControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == date).ToList();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public decimal GetTotalByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadEntradasControle
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao == date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }
    }
}
