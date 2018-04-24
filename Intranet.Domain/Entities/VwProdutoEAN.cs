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
        public Int64 Row { get; set; }

        [DataMember]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Codigo { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Produto { get; set; }

        [DataMember]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdSuperProduto { get; set; }

        [DataMember]
        public long? CdEAN { get; set; }

        [DataMember]
        public decimal? QtVenda { get; set; }

        [DataMember]
        public bool Morto { get; set; }

        [DataMember]
        public bool Sazonal { get; set; }

        [DataMember]
        public bool UsoConsumo { get; set; }

        [DataMember]
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
