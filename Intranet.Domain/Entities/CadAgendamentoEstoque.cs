using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Agendamento_Estoque")]
    public partial class CadAgendamentoEstoque
    {
        [Key]
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Column(TypeName = "text")]
        [Required]
        public string Nome { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DtInicio { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DtFim { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public bool Alterado { get; set; }

        [DataMember]
        public bool Retornado { get; set; }

        [DataMember]
        public DateTime DtInclusao { get; set; }

        [DataMember]
        public virtual Usuario UsuarioCadastro { get; set; }
    }
}
