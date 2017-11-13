using Intranet.Solidcon.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class PessoaJuridicaRepository : RepositoryBase<PessoaJuridica>, IPessoaJuridicaRepository
    {
        public PessoaJuridicaRepository(CentralContext context)
            : base(context)
        { }

        public PessoaJuridica GetByCNPJ(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            return Db.PessoasJuridica.FirstOrDefault(x => x.CNPJEmpresa == CNPJEmpresa
            && x.CNPJFilial == CNPJFilial
            && x.CNPJDV == CNPJDV);
        }

        public int GetCdPessoaJuridica(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            return Db.PessoasJuridica.FirstOrDefault(x => x.CNPJEmpresa == CNPJEmpresa
            && x.CNPJFilial == CNPJFilial
            && x.CNPJDV == CNPJDV).cdPessoaJuridica;
        }

        public PessoaJuridica GetByRazaoSocial(string razaoSocial)
        {
            return Db.PessoasJuridica.FirstOrDefault(x => x.RazaoSocial == razaoSocial);
        }
    }
}
