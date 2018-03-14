using Intranet.Alvorada.Data.Context;
using Intranet.Domain.Entities.DTOS;
using Intranet.Domain.Entities;
using Intranet.Solidcon.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class PlanoDeContasService
    {
        List<PlanoDeContasDTO> planoDeContas = new List<PlanoDeContasDTO>();
        List<SegundoNivelDTO> segundoNivel = new List<SegundoNivelDTO>();
        List<TerceiroNivelDTO> terceiroNivel = new List<TerceiroNivelDTO>();
        List<QuartoNivelDTO> quartoNivel = new List<QuartoNivelDTO>();
        List<QuintoNivelDTO> quintoNivel = new List<QuintoNivelDTO>();

        public PlanoDeContasService(AlvoradaContext context)
        {
            context = new AlvoradaContext();
        }


        public void GetAllByAnoMesFilialOne(int ano, int mes, string filial)
        {

            //List<PlanoDeContasDTO> planoDeContas = new List<PlanoDeContasDTO>();
            //List<PlanoDeContasDTO> planoDeContas = new List<PlanoDeContasDTO>();
            //List<PlanoDeContasDTO> planoDeContas = new List<PlanoDeContasDTO>();

            var context = new AlvoradaContext();

            var result = context.VwLancamentoContabilRaizOne.Where(x => x.Ano == ano && x.MesNumber == mes
                && x.nmPessoa == filial).ToList().OrderBy(x => x.CodigoContabil);

            foreach (var item in result)
            {
                //    var resultnivel2 = context.VwLancamentoContabilRaizTwo.Where(x => x.Ano == ano && x.MesNumber == mes
                //&& x.nmPessoa == filial && x.CodigoContabilPai == codigoContabil).ToList();

                planoDeContas.Add(new PlanoDeContasDTO
                {
                    Ano = item.Ano,
                    CodigoContabil = item.CodigoContabil,
                    MesNumber = item.MesNumber,
                    nmPessoa = item.nmPessoa,
                    Valor = item.Valor,
                    ValorMesAnt = item.ValorMesAnt,
                    ValorAnoAnt = item.ValorAnoAnt,
                    NomeContabil = item.NomeContabil,
                    Row = item.Row
                });
            }


            //return planoDeContas;
        }

        public void GetAllSegundoNivel(int ano, int mes, string filial)
        {
            var context = new AlvoradaContext();

            var result = context.VwLancamentoContabilRaizTwo.Where(x => x.Ano == ano && x.MesNumber == mes
            && x.nmPessoa == filial).ToList().OrderBy(x => x.CodigoContabil);

            foreach (var item in result)
            {
                segundoNivel.Add(new SegundoNivelDTO
                {
                    Ano = item.Ano,
                    CodigoContabil = item.CodigoContabil,
                    MesNumber = item.MesNumber,
                    nmPessoa = item.nmPessoa,
                    NomeContabil = item.NomeContabil,
                    Valor = item.Valor,
                    ValorMesAnt = item.ValorMesAnt,
                    ValorAnoAnt = item.ValorAnoAnt,
                    Row = item.Row,
                    CodigoContabilPai = item.CodigoContabilPai
                });
            }
        }

        public void GetAllTerceiroNivel(int ano, int mes, string filial)
        {
            var context = new AlvoradaContext();

            var result = context.VwLancamentoContabilRaizThree.Where(x => x.Ano == ano && x.MesNumber == mes
            && x.nmPessoa == filial).ToList().OrderBy(x => x.CodigoContabil);

            foreach (var item in result)
            {
                terceiroNivel.Add(new TerceiroNivelDTO
                {
                    Ano = item.Ano,
                    CodigoContabil = item.CodigoContabil,
                    MesNumber = item.MesNumber,
                    nmPessoa = item.nmPessoa,
                    NomeContabil = item.NomeContabil,
                    Valor = item.Valor,
                    ValorMesAnt = item.ValorMesAnt,
                    ValorAnoAnt = item.ValorAnoAnt,
                    Row = item.Row,
                    CodigoContabilPai = item.CodigoContabilPai
                });
            }
        }

        public void GetAllQuartoNivel(int ano, int mes, string filial)
        {
            var context = new AlvoradaContext();

            var result = context.VwLancamentoContabilRaizFour.Where(x => x.Ano == ano && x.MesNumber == mes
            && x.nmPessoa == filial).ToList().OrderBy(x => x.CodigoContabil);

            foreach (var item in result)
            {
                quartoNivel.Add(new QuartoNivelDTO
                {
                    Ano = item.Ano,
                    CodigoContabil = item.CodigoContabil,
                    MesNumber = item.MesNumber,
                    nmPessoa = item.nmPessoa,
                    NomeContabil = item.NomeContabil,
                    Valor = item.Valor,
                    ValorMesAnt = item.ValorMesAnt,
                    ValorAnoAnt = item.ValorAnoAnt,
                    Row = item.Row,
                    CodigoContabilPai = item.CodigoContabilPai
                });
            }
        }

        public void GetAllQuintoNivel(int ano, int mes, string filial)
        {
            var context = new AlvoradaContext();

            var result = context.VwLancamentoContabilRaizFive.Where(x => x.Ano == ano && x.MesNumber == mes
            && x.nmPessoa == filial).ToList().OrderBy(x => x.CodigoContabil);

            foreach (var item in result)
            {
                quintoNivel.Add(new QuintoNivelDTO
                {
                    Ano = item.Ano,
                    CodigoContabil = item.CodigoContabil,
                    MesNumber = item.MesNumber,
                    nmPessoa = item.nmPessoa,
                    NomeContabil = item.NomeContabil,
                    Valor = item.Valor,
                    ValorMesAnt = item.ValorMesAnt,
                    ValorAnoAnt = item.ValorAnoAnt,
                    Row = item.Row,
                    CodigoContabilPai = item.CodigoContabilPai
                });
            }
        }

        public IEnumerable<PlanoDeContasDTO> Unir(int ano, int mes, string filial)
        {
            GetAllByAnoMesFilialOne(ano, mes, filial);
            GetAllSegundoNivel(ano, mes, filial);
            GetAllTerceiroNivel(ano, mes, filial);
            GetAllQuartoNivel(ano, mes, filial);
            GetAllQuintoNivel(ano, mes, filial);

            // 1 e 2
            foreach (var item in planoDeContas)
            {

                foreach (var item2 in segundoNivel)
                {
                    if (item2.CodigoContabilPai == item.CodigoContabil)
                    {
                        item.children.Add(new SegundoNivelDTO
                        {
                            Ano = item2.Ano,
                            CodigoContabil = item2.CodigoContabil,
                            MesNumber = item2.MesNumber,
                            nmPessoa = item2.nmPessoa,
                            NomeContabil = item2.NomeContabil,
                            Valor = item2.Valor,
                            ValorMesAnt = item2.ValorMesAnt,
                            VarMes = item2.VarMes,
                            ValorAnoAnt = item2.ValorAnoAnt,
                            VarAno = item2.VarAno,
                            Row = item2.Row,
                            CodigoContabilPai = item.CodigoContabil
                        });
                    }
                }
            }

            //2 e 3

            foreach (var item in planoDeContas)
            {

                foreach (var item2 in item.children)
                {

                    foreach(var item3 in terceiroNivel)

                    if (item3.CodigoContabilPai == item2.CodigoContabil)
                    {
                        item2.children.Add(new TerceiroNivelDTO
                        {
                            Ano = item3.Ano,
                            CodigoContabil = item3.CodigoContabil,
                            MesNumber = item3.MesNumber,
                            nmPessoa = item3.nmPessoa,
                            NomeContabil = item3.NomeContabil,
                            Row = item3.Row,
                            CodigoContabilPai = item2.CodigoContabil,
                            Valor = item3.Valor,
                            ValorMesAnt = item3.ValorMesAnt,
                            VarMes = item3.VarMes,
                            ValorAnoAnt = item3.ValorAnoAnt,
                            VarAno = item3.VarAno,
                        });
                    }
                }
            }

            //3 e 4

            foreach (var item in planoDeContas)
            {
                foreach (var item2 in item.children)
                {
                    foreach (var item3 in item2.children)
                    {
                        foreach (var item4 in quartoNivel)
                        {
                            if (item4.CodigoContabilPai == item3.CodigoContabil)
                            {
                                item3.children.Add(new QuartoNivelDTO
                                {
                                    Ano = item4.Ano,
                                    CodigoContabil = item4.CodigoContabil,
                                    MesNumber = item4.MesNumber,
                                    nmPessoa = item4.nmPessoa,
                                    NomeContabil = item4.NomeContabil,
                                    Row = item4.Row,
                                    CodigoContabilPai = item3.CodigoContabil,
                                    Valor = item4.Valor,
                                    ValorMesAnt = item4.ValorMesAnt,
                                    VarMes = item4.VarMes,
                                    ValorAnoAnt = item4.ValorAnoAnt,
                                    VarAno = item4.VarAno,
                                });
                            }
                        }
                    }
                }
            }

            // 4 e 5

            foreach (var item in planoDeContas)
            {
                foreach (var item2 in item.children)
                {
                    foreach (var item3 in item2.children)
                    {
                        foreach (var item4 in item3.children)
                        {
                            foreach (var item5 in quintoNivel)
                            {
                                if (item5.CodigoContabilPai == item4.CodigoContabil)
                                {
                                    item4.children.Add(new QuintoNivelDTO
                                    {
                                        Ano = item5.Ano,
                                        CodigoContabil = item5.CodigoContabil,
                                        MesNumber = item5.MesNumber,
                                        nmPessoa = item5.nmPessoa,
                                        NomeContabil = item5.NomeContabil,
                                        Row = item5.Row,
                                        CodigoContabilPai = item4.CodigoContabil,
                                        Valor = item5.Valor,
                                        ValorMesAnt = item5.ValorMesAnt,
                                        VarMes = item5.VarMes,
                                        ValorAnoAnt = item5.ValorAnoAnt,
                                        VarAno = item5.VarAno,
                                    });
                                }
                            }
                        }
                    }
                }
            }

            return planoDeContas;
        }
    }
}