using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces
{
    public interface IAlertaGeralRepository : IRepositoryBase<AlertaGeral>
    {
        AlertaGeral GetGeralPorProduto(int cdProduto);
        AlertaGeral GetGeralPorProdutoNome(string nomeProduto);
    }
}
