using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Usuario_Operador_Log")]
    public partial class CadUsuarioOperadorLog
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdCadUsuOpe { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public int IdStatus { get; set; }

        [DataMember]
        public DateTime DataLog { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public virtual SitCadProd SitCadProd { get; set; }
    }
}
