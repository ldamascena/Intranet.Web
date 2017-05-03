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
    public class SolUsuarioApp : AppBase<SolUsuario>, ISolUsuarioApp
    {
        private readonly ISolUsuarioService _service;

        public SolUsuarioApp(ISolUsuarioService service)
            : base(service)
        {
            this._service = service;
        }
    }
}
