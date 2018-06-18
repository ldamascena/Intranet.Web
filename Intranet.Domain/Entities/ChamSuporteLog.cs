using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cham_suporte_Log")]
    public partial class ChamSuporteLog
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdChamSuporte { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public int IdStatus { get; set; }

        [DataMember]
        public DateTime DataLog { get; set; }

        [DataMember]
        public virtual Usuario UsuarioLog { get; set; }

        [DataMember]
        public virtual SitCadProd Status { get; set; }
    }
}
