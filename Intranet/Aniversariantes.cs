namespace Intranet
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Aniversariantes
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Column(TypeName = "date")]
        public DateTime Aniversario { get; set; }
    }
}
