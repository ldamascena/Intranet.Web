using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Services
{
    public class AlertaInversaoService : ServiceBase<AlertaInversao>, IAlertaInversaoService
    {
        private readonly IAlertaInversaoRepository _repository;

        public AlertaInversaoService(IAlertaInversaoRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public IEnumerable<AlertaInversao> GetInvertidosPorProduto(int cdProduto)
        {
            return _repository.GetInvertidosPorProduto(cdProduto);
        }
    }
}
