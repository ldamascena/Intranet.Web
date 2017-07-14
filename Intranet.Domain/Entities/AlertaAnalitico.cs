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
    [Table("tbAlertaAnalitico")]
    public class AlertaAnalitico
    {
        [Key]
        public int cdAlertaAnalitico { get; set; }

        [DataMember]
        public int cdAlerta { get; set; }

        [DataMember]
        public int cdProduto { get; set; }

        [DataMember]
        public int pendente { get; set; }

        [DataMember]
        public int analise { get; set; }

        [DataMember]
        public int concluido { get; set; }

        [DataMember]
        [StringLength(100)]
        public string vinculado { get; set; }

        [DataMember]
        public DateTime? dtVinculo { get; set; }

        public virtual AlertaGeral AlertaGeral { get; set; }
    }
}
