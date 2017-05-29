using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class AlertaManualApp : AppBase<AlertaManual>, IAlertaManualApp
    {
        private readonly IAlertaManualService _service;

        public AlertaManualApp(IAlertaManualService service)
            : base(service)
        {
            this._service = service;
        }

        public void IncluirAlerta(AlertaManual obj)
        {
            _service.IncluirAlerta(obj);
        }
    }
}
