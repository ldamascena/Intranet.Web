using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Repositories
{
    public interface IAlertaBalancoRepository : IRepositoryBase<AlertaBalanco>
    {
        List<AlertaBalanco> GetBalancoContainsNomeProduto(string nomeProduto);
        List<AlertaBalanco> GetBalancoPorProduto(int cdProduto);
        List<AlertaBalanco> GetAll(int? situacao = null, DateTime? dataInclusao = null);
    }
}
