using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Intranet.Domain.Entities;
using WebApi.OutputCache.V2;
using Intranet.Domain.Entities.Views;
using System.Data.SqlClient;
using Intranet.Domain.Entities.DTOS;

namespace Intranet.API.Controllers
{
    public class SuperProdutoController : ApiController
    {
        public IEnumerable<vwSuperProduto> GetAll()
        {
            var context = new CentralContext();

            return context.vwSuperProduto;
        }

        public HttpResponseMessage AlteraAbastecimentoProduto(AbastecimentoDTO obj) {
            var context = new CentralContext();

            try
            {
                var responsavel = new SqlParameter("@responsavel", obj.Responsavel);
                var cdCompraTipo = new SqlParameter("@cdCompraTipo", obj.cdCompraTipo);
                var cdSuperProduto = new SqlParameter("@cdSuperProduto", obj.cdSuperProduto);
                

                var result = context.Database.ExecuteSqlCommand("exec spAlteracaoAbastecimentoPorProduto @responsavel, @cdCompraTipo, @cdSuperProduto", responsavel, cdCompraTipo, cdSuperProduto);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AlteraAbastecimentoFornecedor(AbastecimentoDTO obj)
        {
            var context = new CentralContext();

            try
            {
                SqlParameter cdCompraTipo = new SqlParameter("@cdCompraTipo", obj.cdCompraTipo);
                SqlParameter cdPessoaComercial = new SqlParameter("@cdPessoaComercial", obj.cdPessoaComercial);
                SqlParameter responsavel = new SqlParameter("@responsavel", obj.Responsavel);


                var result = context.Database.ExecuteSqlCommand("exec spAlteracaoAbastecimentoPorFornecedor @responsavel, @cdCompraTipo, @cdPessoaComercial", responsavel, cdCompraTipo, cdPessoaComercial);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
