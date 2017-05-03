using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Repositories
{
    public interface IEstoqueFisicoRepository : IRepositoryBase<EstoqueFisico>
    {
        List<EstoqueFisico> GetAllTipoProduto();
        List<EstoqueFisico> GetAllTipoProdutoPorProduto(int cdProduto);
        EstoqueFisico GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(int cdProduto, string cdEmbalagem, decimal qtEmbalagem);
    }
}
