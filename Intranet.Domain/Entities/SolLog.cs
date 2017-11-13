using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbSolLog")]
    public partial class SolLog
    {
        [DataMember]
        public int? cdUsuario { get; set; }

        [DataMember]
        public byte? cdDocumentoTipo { get; set; }

        [DataMember]
        [StringLength(30)]
        public string txChave { get; set; }

        [DataMember]
        public DateTime? dtLog { get; set; }

        [DataMember]
        [StringLength(30)]
        public string nmUsuario { get; set; }

        [DataMember]
        [StringLength(100)]
        public string txOBS { get; set; }

        [DataMember]
        public int? VersaoAplicativo { get; set; }

        [DataMember]
        [StringLength(50)]
        public string Estacao { get; set; }

        [DataMember]
        public int? cdPessoaFilial { get; set; }

        [DataMember]
        public long? nrDocumento { get; set; }

        [DataMember]
        public DateTime? dtInicio { get; set; }

        [DataMember]
        public DateTime? dtFim { get; set; }

        [DataMember]
        public bool? inExclusao { get; set; }

        [DataMember]
        [Key]
        public long cdLog { get; set; }
    }
}
