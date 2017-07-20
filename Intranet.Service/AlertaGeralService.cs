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

        public IEnumerable<AlertaGeral> Get(int? tipoAlerta = null, string situacao = null)
        {
            var result = _repository.GetAll().OrderByDescending(x => x.Severidade);

            if (tipoAlerta == 2)
            {
                var resultInversao = _repositoryInversao.GetAll().Select(y => y.CdProduto);

                switch (situacao)
                {
                    case "Novo":
                        return result.Where(x => resultInversao.Contains(x.CdProduto)
                        && x.Pendente > 0
                        && x.Analise == 0
                        && x.Concluido == 0);
                        break;

                    case "Em Análise":
                        return result.Where(x => resultInversao.Contains(x.CdProduto)
                        && x.Analise > 0);
                        break;
                    case "Concluído":
                        return result.Where(x => resultInversao.Contains(x.CdProduto)
                        && x.Pendente == 0
                        && x.Analise == 0
                        && x.Concluido > 0);
                    default:
                        return result.Where(x => resultInversao.Contains(x.CdProduto) && x.AlertaEmAberto > 0);

                }
            }

            else if (tipoAlerta == 3)
            {
                var resultUltimoCusto = _repositoryUltimoCusto.GetAll().Select(y => y.CdProduto);

                switch (situacao)
                {
                    case "Novo":
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto)
                        && x.Pendente > 0
                        && x.Analise == 0
                        && x.Concluido == 0);
                        break;

                    case "Em Análise":
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto)
                        && x.Analise > 0);
                        break;
                    case "Concluído":
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto)
                        && x.Pendente == 0
                        && x.Analise == 0
                        && x.Concluido > 0);
                    default:
                        return result.Where(x => resultUltimoCusto.Contains(x.CdProduto) && x.AlertaEmAberto > 0);
                }
            }

            else
            {
                switch (situacao)
                {
                    case "Novo":
                        return result.Where(x => x.Pendente > 0
                        && x.Analise == 0
                        && x.Concluido == 0);
                        break;

                    case "Em Análise":
                        return result.Where(x => x.Analise > 0);
                        break;
                    case "Concluído":
                        return result.Where(x => x.Pendente == 0
                        && x.Analise == 0
                        && x.Concluido > 0);
                    default:
                        return result.Where(x => x.AlertaEmAberto > 0);
                }
            }
        }
    }
}
