namespace Intranet.Domain.Entities
{

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Runtime.Serialization;

    [DataContract]
    [Table("Sit_Desp")]
    public partial class SituacaoDesp
    {
        public SituacaoDesp()
        {
            CadSituacoesDesp = new HashSet<CadSitDesp>();
        }

        [DataMember]
        [Key]
        public int IdSitDesp { get; set; }

        [DataMember]
        public string Situacao { get; set; }

        public virtual ICollection<CadSitDesp> CadSituacoesDesp { get; set; }
    }
}
