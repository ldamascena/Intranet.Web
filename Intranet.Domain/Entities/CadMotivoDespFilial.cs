using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Motivo_Desp_Filial")]
    public partial class CadMotivoDespFilial
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public int IdMotivo { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal Limite { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public virtual CadMotivoDesp CadMotivoDesp { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }
    }
}
