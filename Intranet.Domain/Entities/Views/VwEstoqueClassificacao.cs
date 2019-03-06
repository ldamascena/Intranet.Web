using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("vw_EstoqueClassificacao")]
    public partial class VWEstoqueClassificacao
    {
        [DataMember]
        [StringLength(130)]
        public string Filial { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 0)]
        public decimal QtdEstoque { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1, TypeName = "money")]
        public decimal VlEstoque { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        public decimal Venda { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3)]
        public decimal CMV { get; set; }
    }
}
