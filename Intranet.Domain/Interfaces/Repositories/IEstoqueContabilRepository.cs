using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Repositories
{
    public interface IEstoqueContabilRepository : IRepositoryBase<EstoqueContabil>
    {
        EstoqueContabil GetByIdSuperProduto(int cdSuperProduto, int cdPessoaFilial);
        EstoqueContabil GetByNomeSuperProduto(string nomeProduto, int cdPessoaFilial);
    }
}
