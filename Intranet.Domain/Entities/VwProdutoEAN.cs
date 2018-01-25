using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("VwProdutoEAN")]
    public partial class VwProdutoEAN
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Codigo { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdSuperProduto { get; set; }

        [DataMember]
        public long? CdEAN { get; set; }

        [DataMember]
        public decimal? QtVenda { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        public bool Morto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3)]
        public bool Sazonal { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 4)]
        public bool UsoConsumo { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 5)]
        public bool Fracionado { get; set; }

        [DataMember]
        public DateTime? DtCadastro { get; set; }

        [DataMember]
        public DateTime? DtAlteracao { get; set; }

        [DataMember]
        [StringLength(30)]
        public string NmCompraTipo { get; set; }
    }
}
