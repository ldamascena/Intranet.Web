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
    [Table("VW_Operador_Log")]
    public partial class VwOperadorLog
    {
        [Key]
        [DataMember]
        public Int64 Id { get; set; }

        [DataMember]
        public int CdOperador { get; set; }

        [DataMember]
        public DateTime Data { get; set; }

        [DataMember]
        public string NmFilial { get; set; }

        [DataMember]
        public string Tipo { get; set; }
    }
}
