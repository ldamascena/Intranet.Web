using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces
{
    public interface IOrdemServicoRepository : IRepositoryBase<OrdemServicoDTO>
    {
        IEnumerable<OrdemServicoDTO> GetQuery();
    }
}
