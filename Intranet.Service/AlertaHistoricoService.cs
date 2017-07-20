﻿using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Services
{
    public class AlertaHistoricoService : ServiceBase<AlertaHistorico>, IAlertaHistoricoService
    {
        private readonly IAlertaInversaoRepository _repositoryInversao;
        private readonly IAlertaManualRepository _repositoryManual;
        private readonly IAlertaUltimoCustoRepository _repositoryUltimoCusto;
        private readonly IAlertaGeralRepository _repositoryGeral;
        private readonly IAlertaHistoricoRepository _repository;

        public AlertaHistoricoService(IAlertaHistoricoRepository repository,
            IAlertaInversaoRepository repositoryInversao,
            IAlertaGeralRepository repositoryGeral,
            IAlertaManualRepository repositoryManual,
            IAlertaUltimoCustoRepository repositoryUltimoCusto)
            : base(repository)
        {
            this._repository = repository;
            this._repositoryInversao = repositoryInversao;
            this._repositoryGeral = repositoryGeral;
            this._repositoryManual = repositoryManual;
            this._repositoryUltimoCusto = repositoryUltimoCusto;
        }

        public void CadastrarHistoricoInversao(AlertaHistorico obj)
        {
            var resultInversao = _repositoryInversao.GetInvertidosPorProduto(obj.CdProduto).FirstOrDefault(x => x.CdAlertaInversao == obj.CdAlerta);
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultInversao.StatusAlerta;
            obj.NomeProduto = resultGeral.NomeProduto;

            if (obj.StatusAlertaAtual == "Feito" && resultInversao.StatusAlerta == "Pendente")
            {
                resultGeral.Severidade = resultGeral.Severidade - 3;
                resultGeral.AlertaEmAberto--;

            }

            else if ((obj.StatusAlertaAtual == "Analisando" && resultInversao.StatusAlerta == "Feito") || (obj.StatusAlertaAtual == "Pendente" && resultInversao.StatusAlerta == "Feito"))
            {
                resultGeral.Severidade = resultGeral.Severidade + 3;
                resultGeral.AlertaEmAberto = resultGeral.AlertaEmAberto + 1;
            }

            try
            {
                this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, resultInversao.StatusAlerta, obj.NomeUsuario);
                _repository.Add(obj);
                resultInversao.StatusAlerta = obj.StatusAlertaAtual;
                _repositoryInversao.Update(resultInversao);
                _repositoryGeral.Update(resultGeral);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void CadastrarHistoricosInversao(AlertaHistorico obj)
        {
            var resultInversao = _repositoryInversao.GetAll().Where(x => x.CdProduto == obj.CdProduto && (x.StatusAlerta == "Pendente" || x.StatusAlerta == "Analisando")).ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultInversao[0].StatusAlerta;
            obj.NomeProduto = resultGeral.NomeProduto;

            try
            {
                foreach (var item in resultInversao)
                {

                    if (obj.StatusAlertaAtual == "Feito" && (item.StatusAlerta == "Pendente" || item.StatusAlerta == "Analisando"))
                    {
                        resultGeral.Severidade = resultGeral.Severidade - 3;
                        resultGeral.AlertaEmAberto--;

                    }

                    else if ((obj.StatusAlertaAtual == "Analisando" && item.StatusAlerta == "Feito") || (obj.StatusAlertaAtual == "Pendente" && item.StatusAlerta == "Feito"))
                    {
                        resultGeral.Severidade = resultGeral.Severidade + 3;
                        resultGeral.AlertaEmAberto = resultGeral.AlertaEmAberto + 1;
                    }

                    this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, item.StatusAlerta, obj.NomeUsuario);
                    item.StatusAlerta = obj.StatusAlertaAtual;
                    _repositoryInversao.Update(item);

                    obj.CdPessoaFilial = item.CdPessoaFilial;
                    obj.CdAlerta = item.CdAlertaInversao;

                    _repository.Add(obj);
                }

                _repositoryGeral.Update(resultGeral);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void CadastrarHistoricoUltimoCusto(AlertaHistorico obj)
        {
            var resultUltimoCusto = _repositoryUltimoCusto.Get(x => x.CdProduto == obj.CdProduto && x.CdAlertaUltCusto == obj.CdAlerta);
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultUltimoCusto.StatusAlerta;
            obj.NomeProduto = resultGeral.NomeProduto;

            if (obj.StatusAlertaAtual == "Feito")
            {
                resultGeral.Severidade = resultGeral.Severidade - 4;
                resultGeral.AlertaEmAberto--;
            }

            else if (obj.StatusAlertaAtual == "Analisando" && resultUltimoCusto.StatusAlerta == "Feito" || (obj.StatusAlertaAtual == "Pendente" && resultUltimoCusto.StatusAlerta == "Feito"))
            {
                resultGeral.Severidade = resultGeral.Severidade + 4;
                resultGeral.AlertaEmAberto = resultGeral.AlertaEmAberto + 1;
            }

            try
            {
                this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, resultUltimoCusto.StatusAlerta, obj.NomeUsuario);
                _repository.Add(obj);
                resultUltimoCusto.StatusAlerta = obj.StatusAlertaAtual;
                _repositoryUltimoCusto.Update(resultUltimoCusto);
                _repositoryGeral.Update(resultGeral);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void CadastrarHistoricosUltimoCusto(AlertaHistorico obj)
        {
            var resultUltimoCusto = _repositoryUltimoCusto.GetAll().Where(x => x.CdProduto == obj.CdProduto && (x.StatusAlerta == "Pendente" || x.StatusAlerta == "Analisando")).ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultUltimoCusto[0].StatusAlerta;
            obj.NomeProduto = resultGeral.NomeProduto;

            try
            {
                foreach (var item in resultUltimoCusto)
                {
                    if (obj.StatusAlertaAtual == "Feito" && (item.StatusAlerta == "Pendente" || item.StatusAlerta == "Analisando"))
                    {
                        resultGeral.Severidade = resultGeral.Severidade - 4;
                        resultGeral.AlertaEmAberto--;
                    }

                    else if (obj.StatusAlertaAtual == "Analisando" && item.StatusAlerta == "Feito" || (obj.StatusAlertaAtual == "Pendente" && item.StatusAlerta == "Feito"))
                    {
                        resultGeral.Severidade = resultGeral.Severidade + 4;
                        resultGeral.AlertaEmAberto = resultGeral.AlertaEmAberto + 1;
                    }


                    this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, item.StatusAlerta, obj.NomeUsuario);
                    item.StatusAlerta = obj.StatusAlertaAtual;
                    _repositoryUltimoCusto.Update(item);

                    obj.CdPessoaFilial = item.CdPessoaFilial;
                    obj.CdAlerta = item.CdAlertaUltCusto;

                    _repository.Add(obj);
                }

                _repositoryGeral.Update(resultGeral);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CadastrarHistoricoManual(AlertaHistorico obj)
        {
            var resultManual = _repositoryManual.Get(x => x.CdProduto == obj.CdProduto && x.CdAlertaManual == obj.CdAlerta);
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultManual.StatusAlerta;
            obj.NomeProduto = resultManual.NomeProduto;

            if (obj.StatusAlertaAtual == "Feito")
            {
                resultGeral.Severidade = resultGeral.Severidade - resultManual.Severidade;
                resultGeral.AlertaEmAberto--;
            }
            try
            {
                _repository.Add(obj);
                resultManual.StatusAlerta = obj.StatusAlertaAtual;
                _repositoryManual.Update(resultManual);
                _repositoryGeral.Update(resultGeral);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void CadastrarHistoricosManual(AlertaHistorico obj)
        {
            var resultManual = _repositoryManual.GetAll().Where(x => x.CdProduto == obj.CdProduto && x.StatusAlerta == "Pendente").ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultManual[0].StatusAlerta;
            obj.NomeProduto = resultManual[0].NomeProduto;

            try
            {
                foreach (var item in resultManual)
                {
                    if (obj.StatusAlertaAtual == "Feito")
                    {
                        resultGeral.Severidade = resultGeral.Severidade - item.Severidade;
                        resultGeral.AlertaEmAberto--;
                    }

                    item.StatusAlerta = obj.StatusAlertaAtual;
                    _repositoryManual.Update(item);

                    obj.CdPessoaFilial = item.CdPessoaFilial;

                    _repository.Add(obj);
                }

                _repositoryGeral.Update(resultGeral);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<AlertaHistorico> ObterAlertasPorProdutoTipoAlerta(int cdProduto)
        {
            return _repository.ObterAlertasPorProdutoTipoAlerta(cdProduto);
        }

        public void AtualizarAnalitico(int cdProduto, string statusAtual, string statusAnterior, string usuario)
        {
            var result = _repositoryGeral.Get(x => x.CdProduto == cdProduto);

            #region Feitos

            if (statusAtual == "Feito" && statusAnterior == "Pendente")
            {
                result.Concluido = result.Concluido + 1;
                result.Pendente = result.Pendente - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            else if (statusAtual == "Feito" && statusAnterior == "Analisando")
            {
                result.Concluido = result.Concluido + 1;
                result.Analise = result.Analise - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            #endregion

            #region Analisando

            else if (statusAtual == "Analisando" && statusAnterior == "Feito")
            {
                result.Analise = result.Analise + 1;
                result.Concluido = result.Concluido - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            else if (statusAtual == "Analisando" && statusAnterior == "Pendente")
            {
                result.Analise = result.Analise + 1;
                result.Pendente = result.Pendente - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            #endregion

            else if (statusAtual == "Pendente" && statusAnterior == "Feito")
            {
                result.Pendente = result.Pendente + 1;
                result.Concluido = result.Concluido - 1;
                _repositoryGeral.Update(result);
            }

            else if (statusAtual == "Pendente" && statusAnterior == "Analisando")
            {
                result.Pendente = result.Pendente + 1;
                result.Analise = result.Analise - 1;
                _repositoryGeral.Update(result);
            }
        }
    }
}
