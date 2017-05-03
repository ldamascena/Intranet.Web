using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Applications
{
    public interface IClassificacaoProdutoApp : IAppBase<ClassificacaoProduto>
    {
        List<ClassificacaoProduto> GetAllVinculado(string nomeClassificacao);
        void AlterarClassificacaoProduto(ClassificacaoProduto objView);
    }
}
