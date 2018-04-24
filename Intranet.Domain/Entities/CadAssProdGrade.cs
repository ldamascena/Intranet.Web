using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace Intranet.Domain.Entities
{
    public partial class CadAssProdGrade
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public int IdCadAssProd { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        [StringLength(50)]
        public string EAN { get; set; }
    }
}
