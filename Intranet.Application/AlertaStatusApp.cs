using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class AlertaStatusApp : AppBase<AlertaStatus>, IAlertaStatusApp
    {
        private IAlertaStatusService _service;

        public AlertaStatusApp(IAlertaStatusService service)
            : base(service)
        {
            this._service = service;
        }
    }
}
