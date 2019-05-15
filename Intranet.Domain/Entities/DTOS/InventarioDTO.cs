using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities.DTOS
{
    [DataContract]
    public class InventarioDTO
    {
        [DataMember]
        public int Codigo { get; set; }

        [DataMember]
        public string Produto { get; set; }

        [DataMember]
        public string Filial { get; set; }

        [DataMember]
        public int Qtd { get; set; }

        [DataMember]
        public decimal Valor { get; set; }
    }
}
