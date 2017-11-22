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

        
    }
}
