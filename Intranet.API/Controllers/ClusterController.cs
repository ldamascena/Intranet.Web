using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Intranet.API.Controllers
{
    public class ClusterController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<string> GetAllCompradores()
        {
            var context = new CentralContext();

            return context.VwClassificacaoComprador.Select(x => x.Comprador).Distinct();
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<VwClassificacaoComprador> GetAllClassificacoesByComprador(string comprador)
        {
            var context = new CentralContext();

             var result = context.VwClassificacaoComprador.Where(x => x.Comprador == comprador).Select(
               x => new VwClassificacaoComprador
               {
                   cdClassificacaoProduto = x.cdClassificacaoProduto,
                   Classificacao = x.Classificacao
               }
                ).Distinct();

            return result;
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<VwProdutosClassificacaoComprador> GetAllProdutosClassificacao(int codigo)
        {
            var context = new CentralContext();

            return context.VwProdutosClassificacaoComprador.Where(x => x.cdClassificacaoProduto == codigo).OrderBy(x => x.Produto);
        }

        public HttpResponseMessage Incluir(List<ClusterLojas> objs)
        {
            var context = new AlvoradaContext();

            try
            {
                foreach (var item in objs)
                {
                    if (context.ClusterLojas.Where(x => x.cdProduto == item.cdProduto).Count() == 1)
                    {
                        item.dtAlteracao = DateTime.Now;
                        context.Entry(item).State = EntityState.Modified;
                    }
                    else
                    {
                        item.dtAlteracao = DateTime.Now;
                        context.ClusterLojas.Add(item);
                    }

                }

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<VwEstatisticaProduto> GetEstatisticaByProduto(int codigo)
        {
            var context = new CentralContext();

            return context.VwEstatisticaProduto.Where(x => x.cdProduto == codigo);
        }
    }
}
