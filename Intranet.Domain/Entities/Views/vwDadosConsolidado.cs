using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{


    [DataContract]
    [Table("vwDadosConsolidado")]
    public partial class vwDadosConsolidado
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        public decimal CMV { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        public decimal Venda { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        public decimal vlPedidos { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3)]
        public decimal vlCompras { get; set; }
    }
}
