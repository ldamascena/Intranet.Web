using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Aniversariantes")]
    public partial class Aniversariantes
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        public string Nome { get; set; }

        [DataMember]
        public string Setor { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime Aniversario { get; set; }
    }
}
