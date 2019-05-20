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
    public class CadSolProdGradeController : ApiController
    {
        
        public IEnumerable<CadSolProdGrade> GetAll()
        {
            var context = new AlvoradaContext();

            return context.CadSolProdGrades.ToList();
        }

        
        public IEnumerable<CadSolProdGrade> GetByIdProduto(int idCadProduto)
        {
            var context = new AlvoradaContext();

            return context.CadSolProdGrades.Where(x => x.IdCadSolProd == idCadProduto).ToList();
        }

        
        public HttpResponseMessage GetGetByIdProdutoExcluir(int IdCadSolProd)
        {
            var context = new AlvoradaContext();
            try
            {
                var result = context.CadSolProdGrades.Where(x => x.IdCadSolProd == IdCadSolProd).ToList();
                foreach (var item in result)
                {
                    context.CadSolProdGrades.Remove(item);
                }
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Incluir([FromBody] CadSolProdGrade obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.CadSolProdGrades.Add(obj);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Alterar([FromBody] CadSolProdGrade obj)
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

        public HttpResponseMessage Excluir([FromBody] CadSolProdGrade obj)
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
    }
}
