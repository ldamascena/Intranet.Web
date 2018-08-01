using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Malote_Log")]
    public partial class MaloteLog
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdMalote { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public int Status { get; set; }

        [DataMember]
        public DateTime DataLog { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }
    }
}
