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
    public class EstoqueNotaController : ApiController
    {
        public int GetAllEstoqueNota()
        {
            var context = new AlvoradaContext();

            return context.VWEstoqueNotas.Count();
        }

        public int GetAllEstoqueNotaProduto()
        {
            var context = new AlvoradaContext();

            return context.VWEstoqueNotasProduto.Count();
        }

        public VwEstoqueNota GetEstoqueNotaByCodigo(int codigo)
        {
            var context = new AlvoradaContext();

            return context.VWEstoqueNotas.Where(x => x.CdEstoqueNota == codigo).FirstOrDefault();
        }

        public IEnumerable<VwEstoqueNotaProduto> GetEstoqueNotaProdutoByCodigo(int codigo)
        {
            var context = new AlvoradaContext();

            return context.VWEstoqueNotasProduto.Where(x => x.CdEstoqueNota == codigo);
        }

        public IEnumerable<VwEstoqueNotaProduto> GetEstoqueNotaProdutoByProduto(string produto)
        {
            var context = new AlvoradaContext();

            return context.VWEstoqueNotasProduto.Where(x => x.Produto == produto);
        }
    }
}
