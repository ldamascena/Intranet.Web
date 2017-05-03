using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class EstoqueMovimentoRepository : RepositoryBase<EstoqueMovimento>, IEstoqueMovimentoRepository
    {
        public EstoqueMovimentoRepository(CentralContext context)
            : base(context)
        { }

        public decimal? UltimoValorItem(int cdProduto, int cdFilial, int cdEstoqueTipo)
        {
            var result = Db.EstoquesMovimento.Where(x => x.CdProduto == cdProduto && x.CdPessoaFilial == cdFilial && x.CdEstoqueTipo == cdEstoqueTipo).OrderByDescending(x => x.DtMovimento).FirstOrDefault();
            return result.VlItem;
        }
    }
}
