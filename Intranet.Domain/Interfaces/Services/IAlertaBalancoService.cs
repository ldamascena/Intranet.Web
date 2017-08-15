using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Interfaces.Services
{
    public interface IAlertaBalancoService : IServiceBase<AlertaBalanco>
    {
        List<AlertaBalanco> GetBalancoContainsNomeProduto(string nomeProduto);
        List<AlertaBalanco> GetBalancoPorProduto(int cdProduto);
        void UpdateBalanco(AlertaBalanco obj);
        List<AlertaBalanco> GetAll(int? situacao = null, DateTime? dataInclusao = null);
    }
}
