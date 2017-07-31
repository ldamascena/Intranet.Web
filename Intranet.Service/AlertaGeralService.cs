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
    public class AlertaGeralService : ServiceBase<AlertaGeral>, IAlertaGeralService
    {
        private readonly IAlertaGeralRepository _repository;
        private readonly IAlertaInversaoRepository _repositoryInversao;
        private readonly IAlertaUltimoCustoRepository _repositoryUltimoCusto;

        public AlertaGeralService(IAlertaGeralRepository repository,
            IAlertaInversaoRepository repositoryInversao,
            IAlertaUltimoCustoRepository repositoryUltimoCusto)
        : base(repository)
        {
            this._repository = repository;
            this._repositoryInversao = repositoryInversao;
            this._repositoryUltimoCusto = repositoryUltimoCusto;
        }

        public AlertaGeral GetGeralPorProduto(int cdProduto)
        {
            return _repository.GetGeralPorProduto(cdProduto);
        }

        public AlertaGeral GetGeralPorProdutoNome(string nomeProduto)
        {
            return _repository.GetGeralPorProdutoNome(nomeProduto);
        }

        public IEnumerable<AlertaGeral> Get(int? tipoAlerta = null, int? situacao = null)
       {
            var result = _repository.GetAll().OrderByDescending(x => x.Severidade);

            if (tipoAlerta == 2)
            {

                var resultInversao = situacao == null ?
                    _repositoryInversao.GetAll().Select(y => y.CdProduto)
                    : _repositoryInversao.GetAll().Where(c => c.CdAlertaStatus == situacao).Select(y => y.CdProduto);

                switch (situacao)
                {
                    case 1:
                        return result.ToList().Where(x => resultInversao.Contains(x.CdProduto)
                        && x.Pendente > 0);
                        break;

                    case 2:
                        return result.ToList().Where(x => resultInversao.Contains(x.CdProduto)
                        && x.Analise > 0);
                        break;
                    case 3:
                        return result.ToList().Where(x => resultInversao.Contains(x.CdProduto)
                        && x.Concluido > 0);
                        break;
                    default:
                        return result;
                        break;

                }
            }

            else if (tipoAlerta == 3)
            {
                var resultUltimoCusto = situacao == null ? _repositoryUltimoCusto.GetAll().Select(y => y.CdProduto)
                    : _repositoryUltimoCusto.GetAll().Where(c => c.CdAlertaStatus == situacao).Select(y => y.CdProduto);
                
                switch (situacao)
                {
                    case 1:
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto)
                        && x.Pendente > 0);
                        break;

                    case 2:
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto)
                        && x.Analise > 0);
                        break;
                    case 3:
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto)
                        && x.Concluido > 0);
                        break;
                    default:
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto) && x.AlertaEmAberto > 0);
                        break;
                }
            }

            else
            {
                switch (situacao)
                {
                    case 1:
                        return result.Where(x => x.Pendente > 0);
                        break;

                    case 2:
                        return result.Where(x => x.Analise > 0);
                        break;
                    case 3:
                        return result.Where(x => x.Concluido > 0);
                        break;
                    default:
                        return result.Where(x => x.AlertaEmAberto > 0);
                        break;
                }
            }
        }
    }
}
