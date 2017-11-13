using Intranet.Solidcon.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class AlertaHistoricoRepository : RepositoryBase<AlertaHistorico>, IAlertaHistoricoRepository
    {
        public AlertaHistoricoRepository(CentralContext context)
            : base(context)
        { }

        public List<AlertaHistorico> ObterAlertasPorProdutoTipoAlerta(int cdProduto)
        {
            return Db.AlertasHistorico.Where(x => x.CdProduto == cdProduto).ToList();
        }
    }
}
