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

namespace Intranet.API.Controllers
{
    public class SuperProdutoController : ApiController
    {
        
        // GET: api/SuperProduto
        public IEnumerable<SuperProduto> GetAll()
        {
            var context = new CentralContext();

            return context.SuperProdutos.ToList();
        }

        
        public IEnumerable<SuperProduto> Getteste()
        {
            var context = new CentralContext();

            var produtos = context.SuperProdutos.SqlQuery(@"Select tbSuperProduto.* from tbProduto
                                                            INNER JOIN tbSuperProduto
                                                                ON tbProduto.cdSuperProduto = tbSuperProduto.cdSuperProduto
                                                            INNER JOIN tbEstoqueFisico
                                                                ON tbEstoqueFisico.cdProduto = tbProduto.cdProduto
                                                            WHERE tbEstoqueFisico.cdEstoqueTipo = 1
                                                            AND tbEstoqueFisico.cdPessoaFilial = 13
                                                            AND tbSuperProduto.cdCompraTipo != 3
                                                            and tbEstoqueFisico.qtEstoqueFisico > 0");

            return produtos;

        }
    }
}
