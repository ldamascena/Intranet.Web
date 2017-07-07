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
    public class AlertaUltimoCustoService : ServiceBase<AlertaUltimoCusto>, IAlertaUltimoCustoService
    {
        private readonly IAlertaUltimoCustoRepository _repository;

        public AlertaUltimoCustoService(IAlertaUltimoCustoRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }
    }
}
