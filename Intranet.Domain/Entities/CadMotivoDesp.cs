namespace Intranet.Domain.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Runtime.Serialization;

    [DataContract]
    [Table("Cad_Motivo_Desp")]
    public partial class CadMotivoDesp
    {
        
        public CadMotivoDesp()
        {
            CadSolicitacoesDesp = new HashSet<CadSolDesp>();
        }

        [DataMember]
        [Key]
        public int IdMotivo { get; set; }

        [DataMember]
        public string Motivo { get; set; }

        public virtual ICollection<CadSolDesp> CadSolicitacoesDesp { get; set; }
    }
}
