using System;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Sol_Desp")]
    public partial class CadSolDesp
    {
        [DataMember]
        [Key]
        public int IdCadSolDesp { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal VlDespesa { get; set; }

        [DataMember]
        public int IdSitDesp { get; set; }

        [DataMember]
        public int IdMotivo { get; set; }

        [DataMember]
        public string Favorecido { get; set; }

        [DataMember]
        public string Documento { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public int? IdAprovador { get; set; }

        [DataMember]
        public DateTime? DataAprovacao { get; set; }

        [DataMember]
        public string ObservacaoAprovacao { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]    
        public int? IdUsuarioInclusao { get; set; }

        [DataMember]
        public bool? Baixa { get; set; }

        [DataMember]
        public DateTime? DataBaixa { get; set; }

        [DataMember]
        public virtual Usuario Aprovador { get; set; }

        [DataMember]
        public virtual Usuario UsuarioInclusao { get; set; }

        [DataMember]
        public virtual CadMotivoDesp CadMotivoDesp { get; set; }

        [DataMember]
        public virtual CadSitDesp CadSitDesp { get; set; }
    }
}
