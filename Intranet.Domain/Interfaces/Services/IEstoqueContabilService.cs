using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IEstoqueContabilService : IServiceBase<EstoqueContabil>
    {
        EstoqueContabil GetByIdSuperProduto(int cdSuperProduto, int cdPessoaFilial);
        EstoqueContabil GetByNomeSuperProduto(string nomeProduto, int cdPessoaFilial);
        void AlterarValorDeCusto(EstoqueContabil obj);
    }
}
