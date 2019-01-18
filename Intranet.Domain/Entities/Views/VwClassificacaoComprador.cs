using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [Table("Vw_Classificacao_Comprador")]
    [DataContract]
    public partial class VwClassificacaoComprador
    {
        [DataMember]
        [StringLength(80)]
        public string Classificacao { get; set; }

        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdClassificacaoProduto { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Comprador { get; set; }
    }
}
