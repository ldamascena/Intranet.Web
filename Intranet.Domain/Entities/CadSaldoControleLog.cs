using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Saldo_Controle_Log")]
    public partial class CadSaldoControleLog
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public int IdUsuarioReabriu { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DataReabriu { get; set; }

        [DataMember]
        public DateTime DataLog { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public virtual Usuario UsuarioReabriu { get; set; }
    }
}
