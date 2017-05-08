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
    public class VendedorService : ServiceBase<Vendedor>, IVendedorService
    {
        private readonly IVendedorRepository _repository;

        public VendedorService(IVendedorRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public IEnumerable<Vendedor> GetVendedorByNome(string nome)
        {
            return _repository.GetVendedorByNome(nome);
        }
    }
}
