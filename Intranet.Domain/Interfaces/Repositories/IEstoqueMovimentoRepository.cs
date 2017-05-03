using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Repositories
{
    public interface IEstoqueMovimentoRepository : IRepositoryBase<EstoqueMovimento>
    {
        decimal? UltimoValorItem(int cdProduto, int cdFilial, int cdEstoqueTipo);
    }
}
