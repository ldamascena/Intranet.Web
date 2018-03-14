using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbAjustePrecoVenda")]
    public partial class AjustePrecoVenda
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPromocao { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdSuperProduto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2, TypeName = "money")]
        public decimal vlVenda { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3, TypeName = "date")]
        public DateTime Data { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 4, TypeName = "money")]
        public decimal vlVendaAnt { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 5, TypeName = "date")]
        public DateTime DataRetorno { get; set; }

        [DataMember]
        public bool? Ativo { get; set; }

        [DataMember]
        public bool? Concluido { get; set; }

        [DataMember]
        public string Usuario { get; set; }

        [DataMember]
        public DateTime? DataInclusao { get; set; }
    }
}
