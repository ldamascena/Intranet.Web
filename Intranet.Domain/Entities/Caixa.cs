using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Caixa")]
    public partial class Caixa
    {
        public Caixa()
        {
            CadCaixaControle = new HashSet<CadCaixaControle>();
        }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string Nome { get; set; }

        public virtual ICollection<CadCaixaControle> CadCaixaControle { get; set; }
    }
}
