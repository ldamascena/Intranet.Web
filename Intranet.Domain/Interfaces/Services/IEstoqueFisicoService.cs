using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IEstoqueFisicoService : IServiceBase<EstoqueFisico>
    {
        List<EstoqueFisico> GetAllTipoProduto();
        List<EstoqueFisico> GetAllTipoProdutoPorProduto(int cdProduto);
        EstoqueFisico GetAllTipoProdutoPorProdutoEmbalagemEQuantidade(int cdProduto, string cdEmbalagem, decimal qtEmbalagem);
        void AtualizarEstoque(EstoqueFisico[] objs);
        void AdicionarEstoque(EstoqueFisico obj);
        void IncluirLog(int? cdProduto, string cdEmbalagem, int? qtVolumes, decimal? vlItem, bool inEntrada, decimal? qtItem, string descricao, decimal? qtEstoqueFisico, decimal? qtEstoqueFinal, int? qtVolumeFinal, decimal? qtEmbalagem, byte? cdMovimentoTipo);
    }
}
