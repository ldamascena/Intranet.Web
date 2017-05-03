using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities
{
    public class OrdemServicoDTO
    {
        public int Id { get; private set; }
        public int IdProduto { get; private set; }
        public string Descricao { get; private set; }
        public string Loja { get; private set; }
        public decimal? QuantidadeEstoque { get; private set; }
        public string Status { get; private set; }
        public DateTime UltimaData { get; private set; }
        public string Observacao { get; private set; }
    }
}
