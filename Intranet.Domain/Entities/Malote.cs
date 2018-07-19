using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Malote")]
    public partial class Malote
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public DateTime DtEnvio { get; set; }

        [DataMember]
        public int Numero_Lacre { get; set; }

        [DataMember]
        public string Descricao { get; set; }

        [DataMember]
        public DateTime? DtRecebimento { get; set; }

        [DataMember]
        public int Status { get; set; }

        [DataMember]
        public int IdUsuarioInclusao { get; set; }

        [DataMember]
        public int IdMalote { get; set; }

        [DataMember]
        public int? IdUsuarioEnviado { get; set; }

        [DataMember]
        public int? IdUsuarioRecebimento { get; set; }

        [DataMember]
        public string Motivo { get; set; }

        [DataMember]
        public virtual MaloteTipo MaloteTipo { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public virtual Usuario UsuarioRecebimento { get; set; }
    }
}
