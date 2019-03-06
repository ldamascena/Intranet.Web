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
    public class CadOutrasDespController : ApiController
    {
        
        public IEnumerable<CadOutrasDespControle> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadOutrasDespsControle.ToList();
        }

        
        public IEnumerable<CadOutrasDespControle> GetAllByUser(int idUsuario)
        {
            var context = new AlvoradaContext();

            return context.CadOutrasDespsControle.ToList().Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao.Date == DateTime.Now.Date);
        }

        public HttpResponseMessage Incluir(CadOutrasDespControle model)
        {
            var context = new AlvoradaContext();

            try
            {
                context.CadOutrasDespsControle.Add(model);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Editar(CadOutrasDespControle model)
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

        public HttpResponseMessage Excluir([FromBody] CadOutrasDespControle obj)
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

            return context.CadOutrasDespsControle.ToList()
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao.Date == DateTime.Now.Date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }

        
        public IEnumerable<CadOutrasDespControle> GetAllByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadOutrasDespsControle.Where(x => x.IdUsuario == idUsuario
            && x.DataInclusao == date);
        }

        
        public decimal GetTotalByUserAndDate(int idUsuario, DateTime date)
        {
            var context = new AlvoradaContext();

            return context.CadOutrasDespsControle
                .Where(x => x.IdUsuario == idUsuario && x.DataInclusao == date)
                .GroupBy(x => x.IdUsuario)
                .Select(y => y.Sum(x => x.Valor)).FirstOrDefault();
        }
    }
}
