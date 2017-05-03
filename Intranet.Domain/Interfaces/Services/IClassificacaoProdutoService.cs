using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IClassificacaoProdutoService : IServiceBase<ClassificacaoProduto>
    {
        List<ClassificacaoProduto> GetAllVinculado(string nomeClassificacao);
        void AlterarClassificacaoProduto(ClassificacaoProduto objView);
    }
}
