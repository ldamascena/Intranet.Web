using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{

    [DataContract]
    public partial class VwClassificacaoMetaMes
    {
        [Key]
        [DataMember]
        public long Id { get; set; }

        [StringLength(20)]
        [DataMember]
        public string nomeMes { get; set; }

        [DataMember]
        public DateTime dtMes { get; set; }

        [Column(TypeName = "money")]
        [DataMember]
        public decimal? MetaCompra { get; set; }

        [DataMember]
        public double? MetaMarkup { get; set; }
    }
}
