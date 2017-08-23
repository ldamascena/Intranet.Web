using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbEstoqueTipo")]
    public partial class EstoqueTipo
    {
        public EstoqueTipo()
        {
            EstoqueContabil = new HashSet<EstoqueContabil>();
        }

        [DataMember]
        [Key]
        public byte CdEstoqueTipo { get; set; }

        [DataMember]
        [StringLength(30)]
        public string NmEstoqueTipo { get; set; }

        public virtual ICollection<EstoqueContabil> EstoqueContabil { get; set; }
    }
}
