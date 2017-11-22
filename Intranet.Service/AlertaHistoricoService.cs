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
        private readonly IAlertaQuarentenaRepository _repositoryQuarentena;
        private readonly IAlertaBalancoRepository _repositoryBalanco;
        private readonly IEstoqueFisicoRepository _repositoryEstqqueFisico;

        private const int ID_NOVO = 1;
        private const int ID_ANALISE = 2;
        private const int ID_CONCLUIDO = 3;
        private const int ID_BALANCO = 4;

        public AlertaHistoricoService(IAlertaHistoricoRepository repository,
            IAlertaInversaoRepository repositoryInversao,
            IAlertaGeralRepository repositoryGeral,
            IAlertaManualRepository repositoryManual,
            IAlertaUltimoCustoRepository repositoryUltimoCusto,
            IAlertaQuarentenaRepository repositoryQuarentena,
            IAlertaBalancoRepository repositoryBalanco,
            IEstoqueFisicoRepository repositoryEstqqueFisico)
            : base(repository)
        {
            this._repository = repository;
            this._repositoryInversao = repositoryInversao;
            this._repositoryGeral = repositoryGeral;
            this._repositoryManual = repositoryManual;
            this._repositoryUltimoCusto = repositoryUltimoCusto;
            this._repositoryQuarentena = repositoryQuarentena;
            this._repositoryBalanco = repositoryBalanco;
            this._repositoryEstqqueFisico = repositoryEstqqueFisico;
        }

    }
}
