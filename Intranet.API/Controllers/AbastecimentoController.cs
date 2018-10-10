using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class AbastecimentoController : ApiController
    {
        public IEnumerable<VwMixAbastecimentoPromo> GetAllByComprador(string Comprador, int cdPromo)
        {
            var context = new CentralContext();

            return context.VwMixAbastecimentoPromo.Where(x => x.Comprador == Comprador && x.cdPromocao == cdPromo);
        }

        public VwProdutosMovimento GetAllByCodigoAndFilial(int codigo, int codigoFilial)
        {
            var context = new CentralContext();

            return context.VwProdutosMovimento.Where(x => x.cdProduto == codigo && x.cdPessoaFilial == codigoFilial).FirstOrDefault();
        }

        public IEnumerable<ParametroAbastecimento> GetAllParametro()
        {
            var context = new AlvoradaContext();

            return context.ParametrosAbastecimento;
        }

        public ParametroAbastecimento GetParametroByPromocao(int codigo)
        {
            var context = new AlvoradaContext();

            return context.ParametrosAbastecimento.Where(x => x.cdPromocao == codigo).FirstOrDefault();
        }

        public HttpResponseMessage IncluirParametro(ParametroAbastecimento obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DataInclusao = DateTime.Now;
                context.ParametrosAbastecimento.Add(obj);
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
