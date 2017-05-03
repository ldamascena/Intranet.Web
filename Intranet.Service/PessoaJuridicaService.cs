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
    public class PessoaJuridicaService : ServiceBase<PessoaJuridica>, IPessoaJuridicaService
    {
        public IPessoaJuridicaRepository _repository;

        public PessoaJuridicaService(IPessoaJuridicaRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public PessoaJuridica GetByCNPJ(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            return _repository.GetByCNPJ(CNPJEmpresa, CNPJFilial, CNPJDV);
        }

        public PessoaJuridica GetByRazaoSocial(string razaoSocial)
        {
            return _repository.GetByRazaoSocial(razaoSocial);
        }
    }
}
