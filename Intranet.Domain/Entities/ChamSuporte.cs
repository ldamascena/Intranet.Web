using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cham_suporte")]
    public partial class ChamSuporte
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdAssunto { get; set; }

        [DataMember]
        [Required]
        public string Setor { get; set; }

        [DataMember]
        [Column(TypeName = "text")]
        public string Descricao { get; set; }

        [DataMember]
        public int IdStatus { get; set; }

        [DataMember]
        public int? IdVinculado { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public virtual ChamSuporteAssunto ChamadoSuporteAssunto { get; set; }

        [DataMember]
        public virtual SitCadProd Status { get; set; }

        [DataMember]
        public virtual Usuario UsuarioCadastro { get; set; }

        [DataMember]
        public virtual Usuario UsuarioVinculado { get; set; }
    }
}
