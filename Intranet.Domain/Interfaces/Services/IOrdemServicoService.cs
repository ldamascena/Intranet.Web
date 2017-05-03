using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces
{
    public interface IOrdemServicoService : IServiceBase<OrdemServicoDTO>
    {
        IEnumerable<OrdemServicoDTO> GetQuery();
    }
}
