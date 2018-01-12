using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

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
    }
}
