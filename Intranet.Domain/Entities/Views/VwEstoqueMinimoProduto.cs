using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VwEstoqueMinimoProduto")]
    public partial class VwEstoqueMinimoProduto
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [StringLength(30)]
        public string nmPessoa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPessoa { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3)]
        public decimal qtEstoqueUnitarioMinimoAtual { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 4, TypeName = "numeric")]
        public decimal qtEstoqueUnitarioMinimoProposto { get; set; }
    }
}
