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
    [Table("tbAlertaQuarentena")]
    public partial class AlertaQuarentena
    {
        [DataMember]
        [Key]
        public int cdAlertaQuarentena { get; set; }

        [DataMember]
        public int cdProduto { get; set; }

        [DataMember]
        public int cdPessoaFilial { get; set; }

        [DataMember]
        public int cdTipoAlerta { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime dtInclusao { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime dtSaida { get; set; }

    }
}
