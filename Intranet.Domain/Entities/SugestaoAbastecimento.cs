using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Sugestao_Abastecimento")]
    public partial class SugestaoAbastecimento
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int cdPromocao { get; set; }

        [DataMember]
        public int cdProduto { get; set; }

        [DataMember]
        public int cdPessoaFilial { get; set; }

        [DataMember]
        public int sugestaoComprador { get; set; }

        [DataMember]
        public int? conferido { get; set; }
    }
}
