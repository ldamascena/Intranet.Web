using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Saldo_Controle")]
    public partial class CadSaldoControle
    {

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal Saldo { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public DateTime? DataAlteracao { get; set; }

        [DataMember]
        public int? IdUsuarioAlteracao { get; set; }

        public virtual Usuario Usuario { get; set; }

        public virtual Usuario UsuarioAlteracao { get; set; }
    }
}
