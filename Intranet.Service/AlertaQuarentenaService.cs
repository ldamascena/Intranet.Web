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
    public class AlertaQuarentenaService : ServiceBase<AlertaQuarentena>, IAlertaQuarentenaService
    {
        private IAlertaQuarentenaRepository _repository;
        private IAlertaInversaoRepository _repositoryInversao;
        private IAlertaUltimoCustoRepository _repositoryUltimoCusto;
        private IAlertaHistoricoRepository _repositoryHistorico;

        public AlertaQuarentenaService(IAlertaQuarentenaRepository repository, IAlertaInversaoRepository repositoryInversao, 
            IAlertaUltimoCustoRepository repositoryUltimoCusto, IAlertaHistoricoRepository repositoryHistorico)
            : base(repository)
        {
            this._repository = repository;
            this._repositoryInversao = repositoryInversao;
            this._repositoryUltimoCusto = repositoryUltimoCusto;
            this._repositoryHistorico = repositoryHistorico;
        }

        public void IncluirNaQuarentena(AlertaQuarentena obj)
        {
            if (obj.CdAlerta == 0)
            {
                if (obj.CdTipoAlerta == 2)
                {
                    var resultInversao = _repositoryInversao.GetAll().Where(x => x.CdProduto == obj.CdProduto);

                    foreach (var item in resultInversao)
                    {
                        obj.CdPessoaFilial = item.CdPessoaFilial;
                        obj.CdAlerta = item.CdAlertaInv;
                        obj.DtInclusao = DateTime.Now;
                        obj.DtSaida = DateTime.Now.AddDays(obj.Dias);
                        _repository.Add(obj);

                        _repositoryHistorico.Add(new AlertaHistorico
                        {
                            CdProduto = obj.CdProduto,
                            CdAlerta = item.CdAlertaInv,
                            DataDoHistorico = DateTime.Now,
                            StatusAlertaAtual = "Quarentena",
                            DescricaoHistorico = "Produto incluido na Quarentena",
                            CdTipoAlerta = obj.CdTipoAlerta,
                            CdPessoaFilial = item.CdPessoaFilial,
                            NomeUsuario = obj.NomeUsuario
                        });
                    }
                }

                else if (obj.CdTipoAlerta == 3)
                {

                    var resultUltimoCusto = _repositoryUltimoCusto.GetAll().Where(x => x.CdProduto == obj.CdProduto);

                    foreach (var item in resultUltimoCusto)
                    {
                        obj.CdPessoaFilial = item.CdPessoaFilial;
                        obj.CdAlerta = item.CdAlertaUltCusto;
                        obj.DtInclusao = DateTime.Now;
                        obj.DtSaida = DateTime.Now.AddDays(obj.Dias);
                        _repository.Add(obj);

                        _repositoryHistorico.Add(new AlertaHistorico
                        {
                            CdProduto = obj.CdProduto,
                            CdAlerta = item.CdAlertaUltCusto,
                            DataDoHistorico = DateTime.Now,
                            StatusAlertaAtual = "Quarentena",
                            DescricaoHistorico = "Produto incluido na Quarentena",
                            CdTipoAlerta = obj.CdTipoAlerta,
                            CdPessoaFilial = item.CdPessoaFilial,
                            NomeUsuario = obj.NomeUsuario
                        });
                    }

                }
            }

            else
            {
                obj.DtInclusao = DateTime.Now;
                obj.DtSaida = DateTime.Now.AddDays(obj.Dias);

                _repository.Add(obj);

                _repositoryHistorico.Add(new AlertaHistorico
                        {
                            CdProduto = obj.CdProduto,
                            CdAlerta = obj.CdAlerta,
                            DataDoHistorico = DateTime.Now,
                            StatusAlertaAtual = "Quarentena",
                            DescricaoHistorico = "Produto incluido na Quarentena",
                            CdTipoAlerta = obj.CdTipoAlerta,
                            CdPessoaFilial = obj.CdPessoaFilial,
                            NomeUsuario = obj.NomeUsuario
                        });
            }
        }
    }
}
