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
    [Table("tbClassificacaoMeta")]
    public class ClassificacaoMeta
    {
        [Key]
        public int cdMeta { get; set; }

        [DataMember]
        public byte cdEmpresa { get; set; }

        [DataMember]
        public int CdClassificacaoMeta { get; set; }

        [StringLength(30)]
        public string CdOrdem { get; set; }

        [DataMember]
        public string nmClassificacaoProduto { get; set; }

        [DataMember]
        public DateTime dtMes { get; set; }

        [DataMember]
        public string nomeMes { get; set; }

        [DataMember]
        public decimal? dispCompras { get; set; }

        [DataMember]
        public decimal? metaMarkup { get; set; }

    }
}
