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

namespace Intranet.API.Controllers
{
    public class ClusterController : ApiController
    {
        public IEnumerable<string> GetAllCompradores()
        {
            var context = new CentralContext();

            return context.VwClassificacaoComprador.Select(x => x.Comprador).Distinct();
        }

        public IEnumerable<string> GetAllClassificacoesByComprador(string comprador)
        {
            var context = new CentralContext();

            return context.VwClassificacaoComprador.Where(x => x.Comprador == comprador).Select(x => x.Classificacao).Distinct();
        }

        public IEnumerable<VwProdutosClassificacaoComprador> GetAllProdutosClassificacao(string classificacao)
        {
            var context = new CentralContext();

            return context.VwProdutosClassificacaoComprador.Where(x => x.Classificacao == classificacao).OrderBy(x => x.Produto);
            ;
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

        public IEnumerable<VwEstatisticaProduto> GetEstatisticaByProduto(int codigo)
        {
            var context = new CentralContext();

            return context.VwEstatisticaProduto.Where(x => x.cdProduto == codigo);
        }

        public ClusterConfig GetConfig()
        {
            var context = new AlvoradaContext();

            return context.ClusterConfig.FirstOrDefault();
        }

        [HttpGet]
        public bool habilitarCluster()
        {
            var context = new AlvoradaContext();
            var result = context.ClusterConfig.FirstOrDefault();

            try
            {
                
                result.Ativo = true;
                result.UltDataReativacao = DateTime.Now;
                context.Entry(result).State = EntityState.Modified;

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        [HttpGet]
        public bool desabilitarCluster()
        {
            var context = new AlvoradaContext();
            var result = context.ClusterConfig.FirstOrDefault();

            try
            {
                
                result.Ativo = false;
                result.UltDataInativacao = DateTime.Now;
                context.Entry(result).State = EntityState.Modified;

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        public HttpResponseMessage AtualizarCluster()
        {
            var contextAlvorada = new CentralContext();
            try
            {
                contextAlvorada.Database.ExecuteSqlCommand("spAlteraCluster");
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
