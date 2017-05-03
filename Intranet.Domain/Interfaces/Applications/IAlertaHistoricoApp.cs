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
        void CadastrarHistorico(AlertaHistorico obj);
        List<AlertaHistorico> ObterAlertasPorProdutoTipoAlerta(int cdProduto);
    }
}
