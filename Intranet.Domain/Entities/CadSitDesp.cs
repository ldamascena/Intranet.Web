namespace Intranet.Domain.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Runtime.Serialization;

    [DataContract]
    [Table("Cad_Sit_Desp")]
    public partial class CadSitDesp
    {
        public CadSitDesp()
        {
            CadSolicitacoesDesp = new HashSet<CadSolDesp>();
        }

        [DataMember]
        [Key]
        public int IdCadSitDesp { get; set; }

        [DataMember]
        [StringLength(100)]
        public string Descricao { get; set; }

        [DataMember]
        public int? IdSit { get; set; }

        public virtual ICollection<CadSolDesp> CadSolicitacoesDesp { get; set; }

        [DataMember]
        public virtual SituacaoDesp SitDesp { get; set; }
    }
}
