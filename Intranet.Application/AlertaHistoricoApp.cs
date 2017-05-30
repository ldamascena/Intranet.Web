using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class AlertaHistoricoApp : AppBase<AlertaHistorico>, IAlertaHistoricoApp
    {
        private readonly IAlertaHistoricoService _service;

        public AlertaHistoricoApp(IAlertaHistoricoService service)
            : base(service)
        {
            this._service = service;
        }

        public void CadastrarHistoricoInversao(AlertaHistorico obj)
        {
            _service.CadastrarHistoricoInversao(obj);
        }

        public void CadastrarHistoricoManual(AlertaHistorico obj)
        {
            _service.CadastrarHistoricoManual(obj);
        }

        public void CadastrarHistoricosManual(AlertaHistorico obj)
        {
            _service.CadastrarHistoricosManual(obj);
        }

        public List<AlertaHistorico> ObterAlertasPorProdutoTipoAlerta(int cdProduto)
        {
            return _service.ObterAlertasPorProdutoTipoAlerta(cdProduto);
        }

        public void CadastrarHistoricosInversao(AlertaHistorico obj)
        {
            _service.CadastrarHistoricosInversao(obj);
        }
    }
}
