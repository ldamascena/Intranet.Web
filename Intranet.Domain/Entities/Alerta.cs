using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities
{
    public class Alerta
    {
        [Key]
        public int IdAlerta { get; set; }
        public int IdProduto { get; set; }
        public string Loja { get; set; }
        public string Observacao { get; set; }
        public string Status { get; set; }
        public DateTime DataDeCadastro { get; set; }
    }
}
