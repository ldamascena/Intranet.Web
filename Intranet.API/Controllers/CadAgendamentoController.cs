using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
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
    public class CadAgendamentoController : ApiController
    {
        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<VwEstoqueMinimoProduto> GetProdutoByCodigo(int codigo)
        {
            var context = new CentralContext();

            return context.VwEstoqueMinimoProduto.Where(x => x.cdProduto == codigo);
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public IEnumerable<CadAgendamentoEstoque> GetAllAgendamentos()
        {
            var context = new AlvoradaContext();

            return context.CadAgendamentosEstoque;
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public int GetLastAgendamento()
        {
            var context = new AlvoradaContext();

            return context.CadAgendamentosEstoque.ToList().LastOrDefault().Id;
        }

        [CacheOutput(ServerTimeSpan = 120)]
        public CadAgendamentoEstoque GetAgendamentoById(int Id)
        {
            var context = new AlvoradaContext();

            return context.CadAgendamentosEstoque.Where(x => x.Id == Id).FirstOrDefault();
        }

        public HttpResponseMessage CadastraAgendamento(CadAgendamentoEstoque obj)
        {
            var context = new AlvoradaContext();

            try
            {
                obj.DtInclusao = DateTime.Now;
                context.CadAgendamentosEstoque.Add(obj);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage ExcluirAgendamento(CadAgendamentoEstoque obj)
        {
            var context = new AlvoradaContext();
            var result = context.CadAgendamentosItens.Where(x => x.IdAgendamento == obj.Id);

            try
            {
                context.Entry(obj).State = EntityState.Deleted;
                context.CadAgendamentosItens.RemoveRange(result);
                context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public IEnumerable<CadAgendamentoEstoqueItens> GetAllAgendamentosItens()
        {
            var context = new AlvoradaContext();

            return context.CadAgendamentosItens;
        }

        public IEnumerable<CadAgendamentoEstoqueItens> GetAllAgendamentosItensById(int Id)
        {
            var context = new AlvoradaContext();

            return context.CadAgendamentosItens.Where(x => x.IdAgendamento == Id && x.QtdEstoqueMinimoProposto != 0);
        }

        public HttpResponseMessage IncluirItens(CadAgendamentoEstoqueItens obj)
        {
            var context = new AlvoradaContext();

            try
            {
                context.CadAgendamentosItens.Add(obj);
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
