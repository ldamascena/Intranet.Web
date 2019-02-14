using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class InventarioController : ApiController
    {
        public IEnumerable<string> GetAllTipos()
        {
            var context = new AlvoradaContext();

            return context.InventarioParcialProdutos.Select(x => x.Referencia).Distinct();
        }

        #region Por_Filial

        public IEnumerable<VwInventarioParcial> GetAll(int loja, string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            List<VwInventarioParcial> result = context.VwInventarioParcial
                .Where(x => x.cdPessoaFilial == loja && x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).ToList()
            .GroupBy(x => new
            {
                x.Filial,
                x.cdProduto,
                x.Produto,
                x.Categoria,
                x.Secao
            }).ToList().Select(g => new VwInventarioParcial
            {
                Filial = g.First().Filial,
                cdProduto = g.Key.cdProduto,
                Produto = g.Key.Produto,
                Categoria = g.Key.Categoria,
                Secao = g.Key.Secao,
                Qtd = g.Sum(x => x.Qtd),
                Venda = g.Sum(x => x.Venda),
                Custo = g.Sum(x => x.Custo),
                Estoque = g.Sum(x => x.Estoque),
                qtItemInventario = g.Sum(x => x.qtItemInventario),
                qtAjusteItem = g.Sum(x => x.qtAjusteItem),
                vlAjuste = g.Sum(x => x.vlAjuste),
                QtdQuebra = g.Sum(x => x.QtdQuebra),
                qtItemQuebra = g.Sum(x => x.qtItemQuebra),
                Unitario = g.Sum(x => x.Unitario)
            }).ToList();

            return result.OrderByDescending(x => x.Unitario);

        }

        public IEnumerable<VwInventarioParcial> GetAllGroupFilial(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            List<VwInventarioParcial> result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).ToList()
            .GroupBy(x => new
            {
                x.Filial
            }).ToList().Select(g => new VwInventarioParcial
            {
                Filial = g.First().Filial,
                Qtd = g.Sum(x => x.Qtd),
                Venda = g.Sum(x => x.Venda),
                Custo = g.Sum(x => x.Custo),
                Estoque = g.Sum(x => x.Estoque),
                qtItemInventario = g.Sum(x => x.qtItemInventario),
                qtAjusteItem = g.Sum(x => x.qtAjusteItem),
                vlAjuste = g.Sum(x => x.vlAjuste),
                QtdQuebra = g.Sum(x => x.QtdQuebra),
                qtItemQuebra = g.Sum(x => x.qtItemQuebra),
                Unitario = g.Sum(x => x.Unitario)
            }).ToList();

            return result.OrderByDescending(x => x.Unitario);

        }

        public decimal GetTotalPerdaInv(int loja, string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.cdPessoaFilial == loja && x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.vlAjuste);
            return result;
        }

        public decimal GetTotalQuebraIdent(int loja, string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.cdPessoaFilial == loja && x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Unitario);
            return result;
        }

        public decimal GetTotalQuebra(int loja, string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal perda = context.VwInventarioParcial
                .Where(x => x.cdPessoaFilial == loja && x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.vlAjuste);

            decimal quebra = context.VwInventarioParcial
                .Where(x => x.cdPessoaFilial == loja && x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Unitario);

            decimal result = (perda + (quebra) * -1);

            return result;
        }

        public decimal GetTotalVenda(int loja, string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.cdPessoaFilial == loja && x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Venda);
            return result;
        }

        public decimal GetTotalCusto(int loja, string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.cdPessoaFilial == loja && x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Custo);
            return result;
        }

        #endregion

        #region Por referencia

        public IEnumerable<VwInventarioParcial> GetAllTodos(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            List<VwInventarioParcial> result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).ToList()
            .GroupBy(x => new
            {
                x.cdProduto,
                x.Produto,
                x.Categoria,
                x.Secao
            }).ToList().Select(g => new VwInventarioParcial
            {
                cdProduto = g.Key.cdProduto,
                Produto = g.Key.Produto,
                Categoria = g.Key.Categoria,
                Secao = g.Key.Secao,
                Qtd = g.Sum(x => x.Qtd),
                Venda = g.Sum(x => x.Venda),
                Custo = g.Sum(x => x.Custo),
                Estoque = g.Sum(x => x.Estoque),
                qtItemInventario = g.Sum(x => x.qtItemInventario),
                qtAjusteItem = g.Sum(x => x.qtAjusteItem),
                vlAjuste = g.Sum(x => x.vlAjuste),
                QtdQuebra = g.Sum(x => x.QtdQuebra),
                qtItemQuebra = g.Sum(x => x.qtItemQuebra),
                Unitario = g.Sum(x => x.Unitario)
            }).ToList();

            return result.OrderByDescending(x => x.Unitario);

        }

        public decimal GetTotalPerdaInvTodos(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.vlAjuste);
            return result;
        }

        public decimal GetTotalQuebraIdentTodos(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Unitario);
            return result;
        }

        public decimal GetTotalQuebraTodos(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal perda = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.vlAjuste);

            decimal quebra = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Unitario);

            decimal result = (perda + (quebra) * -1);

            return result;
        }

        public decimal GetTotalVendaTodos(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Venda);
            return result;
        }

        public decimal GetTotalCustoTodos(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Custo);
            return result;
        }

        #endregion

        public decimal GetAllGroupFilialVenda(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Venda);
            return result;
        }
        public decimal GetAllGroupFilialCusto(string referencia, DateTime dataInicio, DateTime dataFim)
        {
            var context = new AlvoradaContext();

            decimal result = context.VwInventarioParcial
                .Where(x => x.Referencia == referencia && x.Data >= dataInicio && x.Data <= dataFim).Sum(y => y.Custo);
            return result;
        }

        public IEnumerable<InventarioParcialProdutos> GetAllProdutos()
        {
            var context = new AlvoradaContext();

            return context.InventarioParcialProdutos;
        }

        public HttpResponseMessage Incluir(InventarioParcialProdutos obj)
        {

            var context = new AlvoradaContext();

            try
            {
                context.InventarioParcialProdutos.Add(obj);
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

        public HttpResponseMessage Excluir(InventarioParcialProdutos obj)
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
    }
}
