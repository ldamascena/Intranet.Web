using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Applications
{
    public interface IAlertaQuarentenaApp : IAppBase<AlertaQuarentena>
    {
        void IncluirNaQuarentena(AlertaQuarentena obj);
    }
}
