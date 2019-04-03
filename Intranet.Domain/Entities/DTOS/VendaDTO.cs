using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities.DTOS
{
    [DataContract]
    public class VendaDTO
    {
        [DataMember]
        public string Filial { get; set; }

        [DataMember]
        public string Comprador { get; set; }

        [DataMember]
        public decimal? Qtd { get; set; }

        [DataMember]
        public decimal? Venda { get; set; }

        [DataMember]
        public decimal? CMV { get; set; }

        [DataMember]
        public decimal? qtEstoque { get; set; }

        [DataMember]
        public decimal? vlEstoque { get; set; }
    }
}
