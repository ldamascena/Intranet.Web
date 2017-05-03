using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Services
{
    public class OrdemServicoService : ServiceBase<OrdemServicoDTO>, IOrdemServicoService
    {
        private readonly IUnitOfWorkService _uow;

        public OrdemServicoService(UnitOfWorkService uow)
            : base(uow)
        {
            this._uow = uow;
        }

        public IEnumerable<OrdemServicoDTO> GetQuery()
        {
            return _uow.Repository< OrdemServicoDTO> GetQuery();
        }
    }
}
