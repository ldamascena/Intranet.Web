using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class AlertaBalancoService : ServiceBase<AlertaBalanco>, IAlertaBalancoService
    {
        public readonly IAlertaBalancoRepository _repository;
        public readonly IAlertaQuarentenaRepository _repositoryQuarentena;
        public readonly IAlertaInversaoRepository _repositoryInversao;
        public readonly IAlertaUltimoCustoRepository _repositoryUltimoCusto;
        public readonly IAlertaHistoricoRepository _repositoryHistorico;
        public readonly IAlertaGeralRepository _repositoryGeral;

        public AlertaBalancoService(IAlertaBalancoRepository repository, IAlertaQuarentenaRepository repositoryQuarentena,
            IAlertaInversaoRepository repositoryInversao, IAlertaUltimoCustoRepository repositoryUltimoCusto
            , IAlertaHistoricoRepository repositoryHistorico, IAlertaGeralRepository repositoryGeral)
            : base(repository)
        {
            this._repository = repository;
            this._repositoryQuarentena = repositoryQuarentena;
            this._repositoryInversao = repositoryInversao;
            this._repositoryUltimoCusto = repositoryUltimoCusto;
            this._repositoryHistorico = repositoryHistorico;
            this._repositoryGeral = repositoryGeral;
        }

        public List<AlertaBalanco> GetBalancoContainsNomeProduto(string nomeProduto)
        {
            return _repository.GetBalancoContainsNomeProduto(nomeProduto);
        }
        public List<AlertaBalanco> GetBalancoPorProduto(int cdProduto)
        {
            return _repository.GetBalancoPorProduto(cdProduto);
        }
        public void UpdateBalanco(AlertaBalanco obj)
        {
            var getProduto = _repository.Get(x => x.CdAlertaBalanco == obj.CdAlertaBalanco);

            getProduto.DtConcluido = DateTime.Now;
            getProduto.Status = obj.Status;
            getProduto.Motivo = obj.Motivo;

            if (obj.Status == 2)
            {
                var resultGeral = _repositoryGeral.Get(x => x.CdProduto == obj.CdProduto);
                var resultInversao = _repositoryInversao.Get(x => x.CdProduto == obj.CdProduto && x.CdPessoaFilial == obj.CdPessoaFilial);

                if (resultInversao != null)
                {
                    _repositoryHistorico.Add(new AlertaHistorico
                    {
                       CdAlerta = resultInversao.CdAlertaInv,
                       CdPessoaFilial = resultInversao.CdPessoaFilial,
                       CdProduto = resultInversao.CdProduto,
                       CdTipoAlerta = resultInversao.CdTipoAlerta,
                       DataDoHistorico = DateTime.Now,
                       DescricaoHistorico = "Retorno de solicitação de balanço do produto",
                       StatusAlertaAnterior = resultInversao.AlertaStatus.nomeStatus,
                       StatusAlertaAtual = "Concluido",
                       NomeUsuario = "Inventário"
                    });
                    resultInversao.CdAlertaStatus = 3;
                    _repositoryInversao.Update(resultInversao);
                    resultGeral.Concluido++;
                    resultGeral.Analise--;
                    resultGeral.AlertaEmAberto--;
                    resultGeral.Severidade = resultGeral.Severidade - 3;
                    _repositoryGeral.Update(resultGeral);
                }

                var resultUltimoCusto = _repositoryUltimoCusto.Get(x => x.CdProduto == obj.CdProduto && x.CdPessoaFilial == obj.CdPessoaFilial);
                if (resultUltimoCusto != null)
                {
                    _repositoryHistorico.Add(new AlertaHistorico
                    {
                        CdAlerta = resultUltimoCusto.CdAlertaUltCusto,
                        CdPessoaFilial = resultUltimoCusto.CdPessoaFilial,
                        CdProduto = resultUltimoCusto.CdProduto,
                        CdTipoAlerta = resultUltimoCusto.CdTipoAlerta,
                        DataDoHistorico = DateTime.Now,
                        DescricaoHistorico = "Retorno de solicitação de balanço do produto",
                        StatusAlertaAnterior = resultUltimoCusto.AlertaStatus.nomeStatus,
                        StatusAlertaAtual = "Concluido",
                        NomeUsuario = "Inventário"
                    });

                    resultUltimoCusto.CdAlertaStatus = 3;
                    _repositoryUltimoCusto.Update(resultUltimoCusto);
                    resultGeral.Concluido++;
                    resultGeral.Analise--;
                    resultGeral.AlertaEmAberto--;
                    resultGeral.Severidade = resultGeral.Severidade - 4;
                    _repositoryGeral.Update(resultGeral);
                }
            }
            _repository.Update(getProduto);
        }
        public List<AlertaBalanco> GetAll(int? situacao = null, DateTime? dataInclusao = null)
        {
            return _repository.GetAll(situacao, dataInclusao);
        }
    }
}
