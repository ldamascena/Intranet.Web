using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IAlertaHistoricoService : IServiceBase<AlertaHistorico>
    {
        void CadastrarHistoricoInversao(AlertaHistorico obj);
        void CadastrarHistoricoManual(AlertaHistorico obj);
        void CadastrarHistoricos(AlertaHistorico obj);
        List<AlertaHistorico> ObterAlertasPorProdutoTipoAlerta(int cdProduto);
    }
}
