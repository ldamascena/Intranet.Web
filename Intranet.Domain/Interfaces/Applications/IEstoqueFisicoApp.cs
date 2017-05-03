using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Applications
{
    public interface IEstoqueFisicoApp : IAppBase<EstoqueFisico>
    {
        List<EstoqueFisico> GetAllTipoProduto();
        List<EstoqueFisico> GetAllTipoProdutoPorProduto(int cdProduto);
        EstoqueFisico GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(int cdProduto, string cdEmbalagem, decimal qtEmbalagem);
        void AtualizarEstoque(EstoqueFisico[] objs);
        void AdicionarEstoque(EstoqueFisico obj);
    }
}
