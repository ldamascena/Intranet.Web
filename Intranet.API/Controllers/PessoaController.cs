using Intranet.Solidcon.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class PessoaController : ApiController
    {
        private readonly PessoaRepository _repository = new PessoaRepository(new CentralContext());

        // GET: api/Pessoa
        public IEnumerable<Pessoa> Get()
        {
            return _repository.GetAll();
        }
    }
}
