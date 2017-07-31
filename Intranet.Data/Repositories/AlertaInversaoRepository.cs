using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class AlertaInversaoRepository : RepositoryBase<AlertaInversao>, IAlertaInversaoRepository
    {
        public AlertaInversaoRepository(CentralContext context)
            : base(context)
        {
            
        }

        public IEnumerable<AlertaInversao> GetInvertidosPorProduto(int cdProduto)
        {
            var result = Db.AlertasInversao.Where(x => x.CdProduto == cdProduto && x.AlertasQuarentena.Count == 0).ToList();
            return result;
        }

    }
}
