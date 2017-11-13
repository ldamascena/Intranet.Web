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
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Intranet.API.Controllers
{
    public class SolUsuarioController : ApiController
    {

        private ISolUsuarioService _service;
        private ISolUsuarioRepository _repository;
        private ISolUsuarioApp _app;

        // GET: api/SolUsuario
        public IEnumerable<SolUsuario> Get()
        {
            // Inicialização das instancias
            _repository = new SolUsuarioRepository(new CentralContext());
            _service = new SolUsuarioService(_repository);
            _app = new SolUsuarioApp(_service);

            return _app.GetAll();
        }
    }
}
