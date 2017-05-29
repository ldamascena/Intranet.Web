using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class AlertaManualService : ServiceBase<AlertaManual>, IAlertaManualService
    {
        private readonly IAlertaManualRepository _repository;

        public AlertaManualService(IAlertaManualRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public void IncluirAlerta(AlertaManual obj)
        {
            obj.DataCriacaoAlerta = DateTime.Now;
            obj.Severidade = 6;
            obj.StatusAlerta = "Pendente";

            _repository.Add(obj);
        }

    }
}
