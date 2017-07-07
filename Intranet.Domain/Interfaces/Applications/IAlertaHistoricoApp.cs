using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Applications
{
    public interface IAlertaHistoricoApp
    {
        void CadastrarHistoricoManual(AlertaHistorico obj);
        void CadastrarHistoricosManual(AlertaHistorico obj);
        void CadastrarHistoricoInversao(AlertaHistorico obj);
        void CadastrarHistoricosInversao(AlertaHistorico obj);
        void CadastrarHistoricoUltimoCusto(AlertaHistorico obj);
        void CadastrarHistoricosUltimoCusto(AlertaHistorico obj);

        List<AlertaHistorico> ObterAlertasPorProdutoTipoAlerta(int cdProduto);
    }
}
