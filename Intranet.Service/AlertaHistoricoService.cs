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
            obj.StatusAlertaAnterior = resultInversao.Status;
            obj.NomeProduto = resultInversao.NomeProduto;

            if (obj.StatusAlertaAtual == "Feito")
            {
                resultGeral.Severidade = resultGeral.Severidade - resultInversao.Severidade;
                resultGeral.AlertaEmAberto--;
            }

            else if (obj.StatusAlertaAtual == "Analisando" && resultInversao.Status == "Feito")
            {
                resultGeral.Severidade = 3;
                resultGeral.AlertaEmAberto = 1;
            }

            resultGeral.Alterado = true;

            try
            {
                _repository.Add(obj);
                resultInversao.Status = obj.StatusAlertaAtual;
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
            var resultInversao = _repositoryInversao.GetAll().Where(x => x.CdProduto == obj.CdProduto && x.Status == "Pendente").ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultInversao[0].Status;
            obj.NomeProduto = resultInversao[0].NomeProduto;

            try
            {
                foreach (var item in resultInversao)
                {
                    if (obj.StatusAlertaAtual == "Feito")
                    {
                        resultGeral.Severidade = resultGeral.Severidade - item.Severidade;
                        resultGeral.AlertaEmAberto--;
                    }

                    item.Status = obj.StatusAlertaAtual;
                    _repositoryInversao.Update(item);

                    obj.CdPessoaFilial = item.CdPessoaFilial;
                    obj.CdAlerta = item.CdAlertaInversao;

                    _repository.Add(obj);
                }

                resultGeral.Alterado = true;

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
            obj.NomeProduto = resultUltimoCusto.NomeProduto;

            if (obj.StatusAlertaAtual == "Feito")
            {
                resultGeral.Severidade = resultGeral.Severidade - resultUltimoCusto.Severidade;
                resultGeral.AlertaEmAberto--;
            }

            else if (obj.StatusAlertaAtual == "Analisando" && resultUltimoCusto.StatusAlerta == "Feito")
            {
                resultGeral.Severidade = 4;
                resultGeral.AlertaEmAberto = 1;
            }

            resultGeral.Alterado = true;

            try
            {
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
            var resultUltimoCusto = _repositoryUltimoCusto.GetAll().Where(x => x.CdProduto == obj.CdProduto && x.StatusAlerta == "Pendente").ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);
            obj.DataDoHistorico = DateTime.Now;
            obj.StatusAlertaAnterior = resultUltimoCusto[0].StatusAlerta;
            obj.NomeProduto = resultUltimoCusto[0].NomeProduto;

            try
            {
                foreach (var item in resultUltimoCusto)
                {
                    if (obj.StatusAlertaAtual == "Feito")
                    {
                        resultGeral.Severidade = resultGeral.Severidade - item.Severidade;
                        resultGeral.AlertaEmAberto--;
                    }

                    item.StatusAlerta = obj.StatusAlertaAtual;
                    _repositoryUltimoCusto.Update(item);

                    obj.CdPessoaFilial = item.CdPessoaFilial;
                    obj.CdAlerta = item.CdAlertaUltCusto;

                    _repository.Add(obj);
                }

                resultGeral.Alterado = true;

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
    }
}
