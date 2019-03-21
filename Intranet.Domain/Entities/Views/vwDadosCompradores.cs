using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities.Views
{
    [DataContract]
    [Table("vwDadosCompradores")]
    public partial class vwDadosCompradores
    {
        [DataMember]
        [StringLength(30)]
        public string Comprador { get; set; }

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
