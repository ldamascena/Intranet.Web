using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class UnitOfWorkServiceBase : IUnitOfWorkServiceBase
    {
        private IUnitOfWorkServiceBase _uow;
        public UnitOfWorkServiceBase(IUnitOfWorkServiceBase uow)
        {
            this._uow = uow;
        }   
    }
}
