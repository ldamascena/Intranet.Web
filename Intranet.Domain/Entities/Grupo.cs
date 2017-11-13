using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet
{
    [DataContract]
    [Table("Grupo")]
    public partial class Grupo
    {
        public Grupo()
        {
            Usuarios = new HashSet<Usuario>();
        }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Nome { get; set; }

        //[DataMember]
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
