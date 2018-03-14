using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Entities.DTOS;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class LancamentoCntController : ApiController
    {

        #region Chamadas All Para teste

        public IEnumerable<VwLancamentoContabilRaizOne> GetAllOne()
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizOne.ToList().OrderBy(x => x.MesNumber).OrderBy(x => x.Ano);
        }

        public IEnumerable<VwLancamentoContabilRaizTwo> GetAllTwo()
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizTwo.ToList().OrderBy(x => x.MesNumber).OrderBy(x => x.Ano);
        }

        public IEnumerable<VwLancamentoContabilRaizThree> GetAllThree()
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizThree.ToList().OrderBy(x => x.MesNumber).OrderBy(x => x.Ano);
        }

        public IEnumerable<VwLancamentoContabilRaizFour> GetAllFour()
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizFour.ToList().OrderBy(x => x.MesNumber).OrderBy(x => x.Ano);
        }

        public IEnumerable<VwLancamentoContabilRaizFive> GetAllFive()
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizFive.ToList().OrderBy(x => x.MesNumber).OrderBy(x => x.Ano);
        }

        #endregion

        public IEnumerable<VwLancamentoContabilRaizOne> GetAllByAnoMesFilialOne(int ano, int mes, string filial)
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizOne
                .Where(x => x.Ano == ano
                && x.MesNumber == mes
                && x.nmPessoa == filial).Where(x => x.CodigoContabil == 1).ToList();
        }

        public IEnumerable<VwLancamentoContabilRaizTwo> GetAllAnoMesFilialTwo(int ano, int mes, string filial, int cdContabilPai)
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizTwo
                .Where(x => x.Ano == ano
            && x.MesNumber == mes
            && x.nmPessoa == filial
            && x.CodigoContabilPai == cdContabilPai)
            .ToList();
        }

        public IEnumerable<VwLancamentoContabilRaizThree> GetAllAnoMesFilialThree(int ano, int mes, string filial, int cdContabilPai)
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizThree
                .Where(x => x.Ano == ano
            && x.MesNumber == mes
            && x.nmPessoa == filial
            && x.CodigoContabilPai == cdContabilPai)
            .ToList();
        }

        public IEnumerable<VwLancamentoContabilRaizFour> GetAllAnoMesFilialFour(int ano, int mes, string filial, int cdContabilPai)
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizFour
                .Where(x => x.Ano == ano
            && x.MesNumber == mes
            && x.nmPessoa == filial
            && x.CodigoContabilPai == cdContabilPai)
            .ToList();
        }

        public IEnumerable<VwLancamentoContabilRaizFive> GetAllAnoMesFilialFive(int ano, int mes, string filial, int cdContabilPai)
        {
            var context = new AlvoradaContext();

            return context.VwLancamentoContabilRaizFive
                .Where(x => x.Ano == ano
            && x.MesNumber == mes
            && x.nmPessoa == filial
            && x.CodigoContabilPai == cdContabilPai)
            .ToList();
        }

        public List<string> getTest()
        {
            List<string> result = new List<string>();

            result.Add("teste");
            result.Add("teste2");
            result.Add("teste3");

            return result;
        }

        public IEnumerable<PlanoDeContasDTO> GetAllPlanoDeContas(int ano, int mes, string filial)
        {
            var context = new AlvoradaContext();

            var _service = new PlanoDeContasService(context);

            return _service.Unir(ano, mes, filial).Where(x => x.CodigoContabil == 1);
        }
    }
}
