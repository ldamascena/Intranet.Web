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
    public class AlertaGeralRepository : RepositoryBase<AlertaGeral>, IAlertaGeralRepository
    {
        public AlertaGeralRepository(CentralContext context)
            : base(context)
        {
        }

        public AlertaGeral GetGeralPorProduto(int cdProduto)
        {
            return Db.AlertasGeral.FirstOrDefault(x => x.CdProduto == cdProduto);
        }

        public AlertaGeral GetGeralPorProdutoNome(string nomeProduto)
        {
            return Db.AlertasGeral.FirstOrDefault(x => x.NomeProduto == nomeProduto);
        }
    }
}
