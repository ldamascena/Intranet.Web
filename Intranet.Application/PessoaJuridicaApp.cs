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
    public class PessoaJuridicaApp : AppBase<PessoaJuridica>, IPessoaJuridicaApp
    {
        public IPessoaJuridicaService _service;

        public PessoaJuridicaApp(IPessoaJuridicaService service)
            : base(service)
        {
            this._service = service;
        }

        public PessoaJuridica GetByCNPJ(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            return _service.GetByCNPJ(CNPJEmpresa, CNPJFilial, CNPJDV);
        }

        public int GetCdPessoaJuridica(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            return _service.GetCdPessoaJuridica(CNPJEmpresa, CNPJFilial, CNPJDV);
        }

        public PessoaJuridica GetByRazaoSocial(string razaoSocial)
        {
            return _service.GetByRazaoSocial(razaoSocial);
        }
    }
}
