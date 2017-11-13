using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Supervisor")]
    public partial class CadSupervisor
    {
        public CadSupervisor()
        {
            CaixasControle = new HashSet<CadCaixaControle>();
        }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Nome { get; set; }

        [DataMember]
        [Required]
        public string Sobrenome { get; set; }

        [DataMember]
        public bool Bloqueado { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public DateTime? DataAlteracao { get; set; }

        [DataMember]
        public DateTime? DataBloqueio { get; set; }

        public virtual ICollection<CadCaixaControle> CaixasControle { get; set; }
    }
}
