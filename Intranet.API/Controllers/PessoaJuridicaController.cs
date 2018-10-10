
using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Intranet.API.Controllers
{
    public class PessoaJuridicaController : ApiController
    {
        public IEnumerable<PessoaJuridica> GetAll()
        {
            var context = new CentralContext();

            return context.PessoasJuridica;
        }

        public PessoaJuridica GetByCNPJ(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            var context = new CentralContext();

            return context.PessoasJuridica.Where(x => x.CNPJEmpresa == CNPJEmpresa && x.CNPJFilial == CNPJFilial && x.CNPJDV == CNPJDV).FirstOrDefault();

        }

        public int GetCdPessoaJuridica(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            var context = new CentralContext();

            return context.PessoasJuridica.Where(x => x.CNPJEmpresa == CNPJEmpresa && x.CNPJFilial == CNPJFilial && x.CNPJDV == CNPJDV).FirstOrDefault().cdPessoaJuridica;
        }

        public PessoaJuridica GetByRazaoSocial(string razaoSocial)
        {
            var context = new CentralContext();

            return context.PessoasJuridica.Where(x => x.RazaoSocial == razaoSocial).FirstOrDefault();
        }
    }
}
