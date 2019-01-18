using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Vw_Estatistica_Produto")]
    public partial class VwEstatisticaProduto
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPessoaFilial { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Filial { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        public decimal? Rotacao { get; set; }

        [DataMember]
        public decimal? RotacaoPromocional { get; set; }

        [DataMember]
        public decimal? Estoque { get; set; }

        [DataMember]
        public decimal? QtdeQuebra { get; set; }

        [DataMember]
        public decimal? Unitario { get; set; }
    }
}
