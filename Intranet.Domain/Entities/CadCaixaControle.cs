using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Caixa_Controle")]
    public partial class CadCaixaControle
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public int? IdUsuarioAlteracao { get; set; }

        [DataMember]
        public int? IdSupervisor { get; set; }

        [DataMember]
        public int? IdAtendente { get; set; }

        [DataMember]
        public int IdCaixa { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal Valor { get; set; }

        [DataMember]
        public DateTime? DataAlteracao { get; set; }

        [DataMember]
        public int? Turno { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public virtual CadAtendente Atendente { get; set; }

        [DataMember]
        public virtual CadSupervisor Supervisor { get; set; }

        [DataMember]
        public virtual Caixa Caixa { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public virtual Usuario UsuarioAlteracao { get; set; }
    }
}
