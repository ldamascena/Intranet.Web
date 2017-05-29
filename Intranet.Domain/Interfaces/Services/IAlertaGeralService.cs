using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IAlertaGeralService : IServiceBase<AlertaGeral>
    {
        AlertaGeral GetGeralPorProduto(int cdProduto);
        AlertaGeral GetGeralPorProdutoNome(string nomeProduto);
    }
}
