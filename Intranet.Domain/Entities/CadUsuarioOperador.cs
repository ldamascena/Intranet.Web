using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Usuario_Operador")]
    public partial class CadUsuarioOperador
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Pessoa { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Setor { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string TipoSolicitacao { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Filial { get; set; }

        [DataMember]
        public bool? Comercial { get; set; }

        [DataMember]
        public bool? Financeiro { get; set; }

        [DataMember]
        public bool? Loja2 { get; set; }

        [DataMember]
        public bool? Concentrador { get; set; }

        [DataMember]
        public bool? Pdv { get; set; }

        [DataMember]
        public bool? Wms { get; set; }

        [DataMember]
        public bool? Pidgin { get; set; }

        [DataMember]
        public bool? Email { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public DateTime? DataConclusao { get; set; }

        [DataMember]
        public int IdStatus { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public virtual SitCadProd SitCadProd { get; set; }
    }
}
