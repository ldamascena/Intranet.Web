using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Entities.DTOS;
using Intranet.Domain.Entities.Views;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

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

        public HttpResponseMessage AlterarParametro(ParametroAbastecimento obj)
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

        public HttpResponseMessage IncluirSugestao(SugestaoAbastecimento obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.conferido = 1;
                context.SugestoesAbastecimento.Add(obj);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AlterarSugestao(SugestaoAbastecimento obj)
        {
            var context = new AlvoradaContext();
            //var result = context.SugestoesAbastecimento.Where(x => x.cdPessoaFilial == obj.cdPessoaFilial && x.cdPromocao == obj.cdPromocao && x.cdProduto == obj.cdProduto).First();

            try
            {

                //context.Entry(result).State = EntityState.Modified;
                //result.sugestaoComprador = obj.sugestaoComprador;
                context.SugestoesAbastecimento.Attach(obj);
                var entry = context.Entry(obj);
                entry.Property(e => e.sugestaoComprador).IsModified = true;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage AlterarAbastecimentoEmMassa(LogAlteracaoAbastecimento obj)
        {
            var contextCentral = new CentralContext();
            try
            {
                var myParam1Parameter = new SqlParameter("@Responsavel", obj.Responsavel);
                contextCentral.Database.ExecuteSqlCommand("spAlteracaoAbastecimento @Responsavel", myParam1Parameter);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public IEnumerable<LogAlteracaoAbastecimento> GetBetweenDates(DateTime dtinicio, DateTime dtfim)
        {
            var context = new AlvoradaContext();

            return context.LogAlteracaoAbastecimento.Where(x => x.Data >= dtinicio && x.Data <= dtfim);
        }

        public IEnumerable<vwSuperProdutoNegociacao> GetBySuperProduto(int codigo)
        {
            var context = new CentralContext();

            var produtos = context.Database.SqlQuery
            <vwSuperProdutoNegociacao>(@"Select 
	                                distinct 
	                                tbSuperProduto.cdSuperProduto,
	                                cdPessoaComercial as cdPessoa,
	                                dbo.fnNomeSuperProduto(tbSuperProduto.cdSuperProduto, 10) as SuperProduto, 
	                                tbCompraTipo.cdCompraTipo, 
	                                tbCompraTipo.nmCompraTipo,
	                                tbPessoa.nmPessoa
                                from tbSuperProduto
                                LEFT JOIN tbCompraTipo
	                                on tbCompraTipo.cdCompraTipo = tbSuperProduto.cdCompraTipo
                                LEFT JOIN tbNegociacao
	                                on tbNegociacao.cdSuperProduto = tbSuperProduto.cdSuperProduto
                                LEFT JOIN tbPessoa
	                                on tbPessoa.cdPessoa = tbNegociacao.cdPessoaComercial
                                where tbSuperProduto.cdSuperProduto = @param1", new SqlParameter("param1", codigo)).ToList();

            return produtos;
        }

        public IEnumerable<vwSuperProdutoNegociacao> GetBySuperProdutos(IEnumerable<int> codigos)
        {
            var context = new CentralContext();

            var produtos = context.Database.SqlQuery
            <vwSuperProdutoNegociacao>(@"Select 
	                                distinct 
	                                tbSuperProduto.cdSuperProduto,
	                                cdPessoaComercial as cdPessoa,
	                                dbo.fnNomeSuperProduto(tbSuperProduto.cdSuperProduto, 10) as SuperProduto, 
	                                tbCompraTipo.cdCompraTipo, 
	                                tbCompraTipo.nmCompraTipo,
	                                tbPessoa.nmPessoa
                                from tbSuperProduto
                                LEFT JOIN tbCompraTipo
	                                on tbCompraTipo.cdCompraTipo = tbSuperProduto.cdCompraTipo
                                LEFT JOIN tbNegociacao
	                                on tbNegociacao.cdSuperProduto = tbSuperProduto.cdSuperProduto
                                LEFT JOIN tbPessoa
	                                on tbPessoa.cdPessoa = tbNegociacao.cdPessoaComercial
                                where tbSuperProduto.cdSuperProduto in (@param1)", new SqlParameter("param1", codigos)).ToList();

            return produtos;
        }

        public IEnumerable<vwSuperProdutoNegociacao> GetByFornecedor(int codigoFornecedor)
        {
            var context = new CentralContext();

            var produtos = context.Database.SqlQuery
            <vwSuperProdutoNegociacao>(@"Select 
	                                distinct 
	                                tbSuperProduto.cdSuperProduto,
	                                cdPessoaComercial as cdPessoa,
	                                dbo.fnNomeSuperProduto(tbSuperProduto.cdSuperProduto, 10) as SuperProduto, 
	                                tbCompraTipo.cdCompraTipo, 
	                                tbCompraTipo.nmCompraTipo,
	                                tbPessoa.nmPessoa
                                from tbSuperProduto
                                LEFT JOIN tbCompraTipo
	                                on tbCompraTipo.cdCompraTipo = tbSuperProduto.cdCompraTipo
                                LEFT JOIN tbNegociacao
	                                on tbNegociacao.cdSuperProduto = tbSuperProduto.cdSuperProduto
                                LEFT JOIN tbPessoa
	                                on tbPessoa.cdPessoa = tbNegociacao.cdPessoaComercial
                                where tbPessoa.cdPessoa = @param1", new SqlParameter("param1", codigoFornecedor)).ToList();

            return produtos;
        }

        public IEnumerable<vwSuperProdutoNegociacao> GetTeste(int codigo)
        {
            var context = new CentralContext();

            var produtos = context.Database.SqlQuery
            <vwSuperProdutoNegociacao>(@"Select 
	                                distinct 
	                                tbSuperProduto.cdSuperProduto,
	                                cdPessoaComercial as cdPessoa,
	                                dbo.fnNomeSuperProduto(tbSuperProduto.cdSuperProduto, 10) as SuperProduto, 
	                                tbCompraTipo.cdCompraTipo, 
	                                tbCompraTipo.nmCompraTipo,
	                                tbPessoa.nmPessoa
                                from tbSuperProduto
                                LEFT JOIN tbCompraTipo
	                                on tbCompraTipo.cdCompraTipo = tbSuperProduto.cdCompraTipo
                                LEFT JOIN tbNegociacao
	                                on tbNegociacao.cdSuperProduto = tbSuperProduto.cdSuperProduto
                                LEFT JOIN tbPessoa
	                                on tbPessoa.cdPessoa = tbNegociacao.cdPessoaComercial
                                where tbSuperProduto.cdSuperProduto = @param1", new SqlParameter("param1", codigo)).ToList();

            return produtos;
        }

    }
}
