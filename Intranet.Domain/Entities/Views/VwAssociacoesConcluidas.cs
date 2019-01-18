using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Vw_Associacoes_Concluidas")]
    public partial class VwAssociacoesConcluidas
    {
        [DataMember]
        public int? Quantidade { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 0)]
        public string Usuario { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public short ANO { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public short MES { get; set; }

        [DataMember]
        [StringLength(17)]
        public string NOME_MES { get; set; }
    }
}
