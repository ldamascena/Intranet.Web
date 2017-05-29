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
    public class EmpresaFilialApp : AppBase<EmpresaFilial>, IEmpresaFilialApp
    {
        private readonly IEmpresaFilialService _service;

        public EmpresaFilialApp(IEmpresaFilialService service)
            : base(service)
        {

        }
    }
}
