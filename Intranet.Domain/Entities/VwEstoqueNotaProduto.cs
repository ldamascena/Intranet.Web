using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VW_EstoqueNota_Produto")]
    public partial class VwEstoqueNotaProduto
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdEstoqueNota { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdEstoqueNotaItem { get; set; }

        [DataMember]
        public int? CdProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [StringLength(2)]
        public string CdEmbalagem { get; set; }

        [DataMember]
        public decimal? QtEmbalagem { get; set; }

        [DataMember]
        public decimal? QtItem { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal? vlItem { get; set; }

        [DataMember]
        public int cdPessoaFilial { get; set; }
    }
}
