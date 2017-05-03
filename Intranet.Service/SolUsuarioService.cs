using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class SolUsuarioService : ServiceBase<SolUsuario>, ISolUsuarioService
    {
        private readonly ISolUsuarioRepository _repository;

        public SolUsuarioService(ISolUsuarioRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }
    }
}
