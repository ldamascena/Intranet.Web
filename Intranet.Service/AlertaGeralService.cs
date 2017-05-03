using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Services
{
    public class AlertaGeralService : ServiceBase<AlertaGeral>, IAlertaGeralService
    {
        private readonly IAlertaGeralRepository _repository;

        public AlertaGeralService(IAlertaGeralRepository repository)
        : base(repository)
        {
            this._repository = repository;
        }

        public AlertaGeral GetGeralPorProduto(int cdProduto)
        {
            return _repository.GetGeralPorProduto(cdProduto);
        }
    }
}
