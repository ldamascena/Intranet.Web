using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Services;
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
        private readonly IAlertaGeralRepository _repositoryGeral;
        private readonly IAlertaHistoricoRepository _repository;

        public AlertaHistoricoService(IAlertaHistoricoRepository repository,
            IAlertaInversaoRepository repositoryInversao,
            IAlertaGeralRepository repositoryGeral)
            : base(repository)
        {
            this._repository = repository;
            this._repositoryInversao = repositoryInversao;
            this._repositoryGeral = repositoryGeral;
        }

        public void CadastrarHistorico(AlertaHistorico obj)
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

        public void CadastrarHistoricos(AlertaHistorico obj)
        {
            var resultInversao = _repositoryInversao.GetInvertidosPorProduto(obj.CdProduto).ToList();
            var resultGeral = _repositoryGeral.GetGeralPorProduto(obj.CdProduto);

            try
            {
                for (int i = 0; i <= resultInversao.Count - 1; i++)
                {

                    obj.StatusAlertaAnterior = resultInversao[i].Status;
                    obj.NomeProduto = resultInversao[i].NomeProduto;
                    obj.CdAlerta = resultInversao[i].CdAlertaInversao;

                    resultInversao[i].Status = obj.StatusAlertaAtual;

                    resultGeral.Severidade = resultGeral.Severidade - resultInversao[i].Severidade;
                    resultGeral.AlertaEmAberto--;

                    obj.DataDoHistorico = DateTime.Now;

                    _repository.Add(obj);
                    _repositoryInversao.Update(resultInversao[i]);
                    _repositoryGeral.Update(resultGeral);
                }
                
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
