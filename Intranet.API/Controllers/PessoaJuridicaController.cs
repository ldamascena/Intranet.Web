using Intranet.Application;
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
        private IPessoaJuridicaRepository _repository;
        private IPessoaJuridicaService _service;
        private IPessoaJuridicaApp _app;

        public IEnumerable<PessoaJuridica> GetAll()
        {
            _repository = new PessoaJuridicaRepository(new CentralContext());
            _service = new PessoaJuridicaService(_repository);
            _app = new PessoaJuridicaApp(_service);

            return _app.GetAll();
        }

        public PessoaJuridica GetByCNPJ(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            _repository = new PessoaJuridicaRepository(new CentralContext());
            _service = new PessoaJuridicaService(_repository);
            _app = new PessoaJuridicaApp(_service);

            return _app.GetByCNPJ(CNPJEmpresa, CNPJFilial, CNPJDV);
        }

        public int GetCdPessoaJuridica(string CNPJEmpresa, int CNPJFilial, int CNPJDV)
        {
            _repository = new PessoaJuridicaRepository(new CentralContext());
            _service = new PessoaJuridicaService(_repository);
            _app = new PessoaJuridicaApp(_service);

            return _app.GetCdPessoaJuridica(CNPJEmpresa, CNPJFilial, CNPJDV);
        }

        public PessoaJuridica GetByRazaoSocial(string razaoSocial)
        {
            _repository = new PessoaJuridicaRepository(new CentralContext());
            _service = new PessoaJuridicaService(_repository);
            _app = new PessoaJuridicaApp(_service);

            return _app.GetByRazaoSocial(razaoSocial);
        }
    }
}
