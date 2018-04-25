using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Ass_Prod_Grade")]
    public partial class CadAssProdGrade
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public int IdCadAssProd { get; set; }

        [DataMember]
        [Required]
        public string Descricao { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string EAN { get; set; }
    }
}
