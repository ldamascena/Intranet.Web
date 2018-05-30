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
    public class EmpresaFilialController : ApiController
    {
        private IEmpresaFilialService _service;
        private IEmpresaFilialRepository _repository;
        private IEmpresaFilialApp _app;

        // GET: api/EmpresaFilial
        public IEnumerable<EmpresaFilial> GetAll()
        {
            // Inicialização das instancias
            _repository = new EmpresaFilialRepository(new CentralContext());
            _service = new EmpresaFilialService(_repository);
            _app = new EmpresaFilialApp(_service);

            return _app.GetAll();
        }

        public IEnumerable<EmpresaFilial> GetAllOrdered()
        {
            // Inicialização das instancias
            _repository = new EmpresaFilialRepository(new CentralContext());
            _service = new EmpresaFilialService(_repository);
            _app = new EmpresaFilialApp(_service);

            return _app.GetAll().OrderBy(x => x.nmFilial);
        }
    }
}
