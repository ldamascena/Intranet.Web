using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet
{
    [DataContract]
    [Table("Vw_Produtos_Movimento")]
    public partial class VwProdutosMovimento
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdProduto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPessoaFilial { get; set; }

        [DataMember]
        public decimal? Atendido { get; set; }

        [DataMember]
        public decimal? Pendente { get; set; }

        [DataMember]
        public decimal? Transito { get; set; }
    }
}
