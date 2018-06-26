using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    [Table("VwEmbalagensProdutoEAN")]
    public partial class VwEmbalagensProdutoEAN
    {
        [DataMember]
        public int CdProduto { get; set; }

        //[DataMember]
        //public long? CdEAN { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 0)]
        [StringLength(2)]
        public string CdEmbalagem { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public decimal QtEmbalagem { get; set; }

        [DataMember]
        public int? Pesog { get; set; }

        [DataMember]
        public int? Alturacm { get; set; }

        [DataMember]
        public int? Larguracm { get; set; }

        [DataMember]
        public int? Comprimentocm { get; set; }

        [DataMember]
        public int? QtLastro { get; set; }

        [DataMember]
        public int? QtCamadas { get; set; }
    }
}
