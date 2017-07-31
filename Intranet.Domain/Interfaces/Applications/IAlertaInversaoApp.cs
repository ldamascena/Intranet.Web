using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces
{
    public interface IAlertaInversaoApp : IAppBase<AlertaInversao>
    {
        IEnumerable<AlertaInversao> ObterPorProduto(int cdProduto);
    }
}
