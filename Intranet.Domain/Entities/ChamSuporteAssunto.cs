using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cham_suporte_assunto")]
    public partial class ChamSuporteAssunto
    {
        public ChamSuporteAssunto()
        {
            ChamadosSuporte = new HashSet<ChamSuporte>();
        }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Descricao { get; set; }

        public virtual ICollection<ChamSuporte> ChamadosSuporte { get; set; }
    }
}
