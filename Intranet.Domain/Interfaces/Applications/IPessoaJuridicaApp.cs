using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Applications
{
    public interface IPessoaJuridicaApp : IAppBase<PessoaJuridica>
    {
        PessoaJuridica GetByCNPJ(string CNPJEmpresa, int CNPJFilial, int CNPJDV);
        PessoaJuridica GetByRazaoSocial(string razaoSocial);
    }
}
