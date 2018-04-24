using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace Intranet.Domain.Entities
{
    public partial class CadAssProd
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public int IdCadAssProd { get; set; }

        [Required]
        [StringLength(100)]
        public string ChaveNFE { get; set; }

        [Required]
        [StringLength(100)]
        public string CNPJ { get; set; }

        public int IdStatus { get; set; }

        public DateTime DataInclusao { get; set; }

        public DateTime? DataAlteracao { get; set; }
    }
}
