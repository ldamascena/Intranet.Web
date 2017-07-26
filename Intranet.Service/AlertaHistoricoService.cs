using Intranet.Domain.Entities;
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

        private const int ID_NOVO = 1;
        private const int ID_ANALISE = 2;
        private const int ID_CONCLUIDO = 3;
        private const int ID_BALANCO = 4;

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
            var resultInversao = _repositoryInversao.GetInvertidosPorProduto(obj.CdProduto).FirstOrDefault(x => x.CdAlertaInv == obj.CdAlerta);
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultInversao.AlertaStatus.nomeStatus;
            obj.NomeProduto = resultGeral.NomeProduto;

            if ((obj.StatusAlertaAtual == "Concluido" && resultInversao.AlertaStatus.nomeStatus == "Novo") || (obj.StatusAlertaAtual == "Concluido" && resultInversao.AlertaStatus.nomeStatus == "Analise"))
            {
                resultGeral.Severidade = resultGeral.Severidade - 3;
                resultGeral.AlertaEmAberto--;
                resultInversao.CdAlertaStatus = ID_CONCLUIDO;

            }

            else if (obj.StatusAlertaAtual == "Analise" && resultInversao.AlertaStatus.nomeStatus == "Novo")
            {
                resultInversao.CdAlertaStatus = ID_ANALISE;

            }

            else if (obj.StatusAlertaAtual == "Analise" && resultInversao.AlertaStatus.nomeStatus == "Concluido")
            {
                resultGeral.Severidade = resultGeral.Severidade + 3;
                resultGeral.AlertaEmAberto++;
                resultInversao.CdAlertaStatus = ID_ANALISE;
            }

            try
            {
                this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, resultInversao.AlertaStatus.nomeStatus, obj.NomeUsuario);
                _repository.Add(obj);
                
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
            var resultInversao = _repositoryInversao.GetAll().Where(x => x.CdProduto == obj.CdProduto && (x.AlertaStatus.nomeStatus == "Novo" || x.AlertaStatus.nomeStatus == "Analise")).ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultInversao[0].AlertaStatus.nomeStatus;
            obj.NomeProduto = resultGeral.NomeProduto;

            try
            {
                foreach (var item in resultInversao)
                {

                    if ((obj.StatusAlertaAtual == "Concluido" && item.AlertaStatus.nomeStatus == "Novo") || (obj.StatusAlertaAtual == "Concluido" && item.AlertaStatus.nomeStatus == "Analise"))
                    {
                        resultGeral.Severidade = resultGeral.Severidade - 3;
                        resultGeral.AlertaEmAberto--;
                        item.CdAlertaStatus = ID_CONCLUIDO;

                    }

                    else if (obj.StatusAlertaAtual == "Analise" && item.AlertaStatus.nomeStatus == "Novo")
                    {
                        item.CdAlertaStatus = ID_ANALISE;

                    }

                    else if (obj.StatusAlertaAtual == "Analise" && item.AlertaStatus.nomeStatus == "Concluido")
                    {
                        resultGeral.Severidade = resultGeral.Severidade + 3;
                        resultGeral.AlertaEmAberto++;
                        item.CdAlertaStatus = ID_ANALISE;
                    }

                    this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, item.AlertaStatus.nomeStatus, obj.NomeUsuario);
                    item.AlertaStatus.nomeStatus = obj.StatusAlertaAtual;
                    _repositoryInversao.Update(item);

                    obj.CdPessoaFilial = item.CdPessoaFilial;
                    obj.CdAlerta = item.CdAlertaInv;

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
            obj.StatusAlertaAnterior = resultUltimoCusto.AlertaStatus.nomeStatus;
            obj.NomeProduto = resultGeral.NomeProduto;

            if ((obj.StatusAlertaAtual == "Concluido" && resultUltimoCusto.AlertaStatus.nomeStatus == "Novo") || (obj.StatusAlertaAtual == "Concluido" && resultUltimoCusto.AlertaStatus.nomeStatus == "Analise"))
            {
                resultGeral.Severidade = resultGeral.Severidade - 4;
                resultGeral.AlertaEmAberto--;
                resultUltimoCusto.CdAlertaStatus = ID_CONCLUIDO;

            }

            else if (obj.StatusAlertaAtual == "Analise" && resultUltimoCusto.AlertaStatus.nomeStatus == "Novo")
            {
                resultUltimoCusto.CdAlertaStatus = ID_ANALISE;

            }

            else if (obj.StatusAlertaAtual == "Analise" && resultUltimoCusto.AlertaStatus.nomeStatus == "Concluido")
            {
                resultGeral.Severidade = resultGeral.Severidade + 4;
                resultGeral.AlertaEmAberto++;
                resultUltimoCusto.CdAlertaStatus = ID_ANALISE;
            }

            try
            {
                this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, resultUltimoCusto.AlertaStatus.nomeStatus, obj.NomeUsuario);
                _repository.Add(obj);
                resultUltimoCusto.AlertaStatus.nomeStatus = obj.StatusAlertaAtual;
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
            var resultUltimoCusto = _repositoryUltimoCusto.GetAll().Where(x => x.CdProduto == obj.CdProduto && (x.AlertaStatus.nomeStatus == "Novo" || x.AlertaStatus.nomeStatus == "Analise")).ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultUltimoCusto[0].AlertaStatus.nomeStatus;
            obj.NomeProduto = resultGeral.NomeProduto;

            try
            {
                foreach (var item in resultUltimoCusto)
                {
                    if ((obj.StatusAlertaAtual == "Concluido" && item.AlertaStatus.nomeStatus == "Novo") || (obj.StatusAlertaAtual == "Concluido" && item.AlertaStatus.nomeStatus == "Analise"))
                    {
                        resultGeral.Severidade = resultGeral.Severidade - 4;
                        resultGeral.AlertaEmAberto--;
                        item.CdAlertaStatus = ID_CONCLUIDO;

                    }

                    else if (obj.StatusAlertaAtual == "Analise" && item.AlertaStatus.nomeStatus == "Novo")
                    {
                        item.CdAlertaStatus = ID_ANALISE;

                    }

                    else if (obj.StatusAlertaAtual == "Analise" && item.AlertaStatus.nomeStatus == "Concluido")
                    {
                        resultGeral.Severidade = resultGeral.Severidade + 4;
                        resultGeral.AlertaEmAberto++;
                        item.CdAlertaStatus = ID_ANALISE;
                    }


                    this.AtualizarAnalitico(obj.CdProduto, obj.StatusAlertaAtual, item.AlertaStatus.nomeStatus, obj.NomeUsuario);
                    item.AlertaStatus.nomeStatus = obj.StatusAlertaAtual;
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

            if (statusAtual == "Concluido" && statusAnterior == "Novo")
            {
                result.Concluido = result.Concluido + 1;
                result.Pendente = result.Pendente - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            else if (statusAtual == "Concluido" && statusAnterior == "Analise")
            {
                result.Concluido = result.Concluido + 1;
                result.Analise = result.Analise - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            #endregion

            #region Analisando

            else if (statusAtual == "Analise" && statusAnterior == "Concluido")
            {
                result.Analise = result.Analise + 1;
                result.Concluido = result.Concluido - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            else if (statusAtual == "Analise" && statusAnterior == "Novo")
            {
                result.Analise = result.Analise + 1;
                result.Concluido = result.Pendente - 1;
                result.Vinculado = usuario;
                _repositoryGeral.Update(result);
            }

            #endregion
        }

        //public void AtualizarStatus(string statusAnterior, string statusAtual)
        //{
        //    if (obj.StatusAlertaAtual == "Concluido" && resultInversao.StatusAlerta == "Novo")
        //    {
        //        resultGeral.Severidade = resultGeral.Severidade - 3;
        //        resultGeral.AlertaEmAberto--;
        //        resultInversao.StatusAlerta = obj.StatusAlertaAtual;

        //    }

        //    if (obj.StatusAlertaAtual == "Analise" && resultInversao.StatusAlerta == "Novo")
        //    {
        //        resultInversao.StatusAlerta =

        //    }

        //    else if (obj.StatusAlertaAtual == "Analise" && resultInversao.StatusAlerta == "Concluido")
        //    {
        //        resultGeral.Severidade = resultGeral.Severidade + 3;
        //        resultGeral.AlertaEmAberto = resultGeral.AlertaEmAberto + 1;
        //    }
        //}
    }
}
