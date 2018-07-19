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
    [Table("Malote_Tipo")]
    public partial class MaloteTipo
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public int Numero { get; set; }

        [DataMember]
        public string Setor { get; set; }

        [DataMember]
        public string Cor { get; set; }

        public virtual ICollection<Malote> Malotes { get; set; }
    }
}
