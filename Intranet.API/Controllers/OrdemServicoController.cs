using Intranet.Data.Context;
using Intranet.Data.Repositories;
using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Intranet.API.Controllers
{
    public class OrdemServicoController : ApiController
    {
        private readonly OrdemServicoRepository _repository = new OrdemServicoRepository(new CentralContext());

        // GET: api/OrdemServico
        public IEnumerable<OrdemServicoDTO> Get()
        {   
            return _repository.GetQuery();
            //return _ordemServicoService.GetQuery();
        }
    }
}
