namespace Intranet.Domain.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Runtime.Serialization;

    [DataContract]
    [Table("tbAlertaInversao")]
    public partial class AlertaInversao
    {
        public AlertaInversao()
        {
            //tbAlertaQuarentena = new HashSet<AlertaQuarentena>();
        }

        [DataMember]
        [Key]
        [Column(Order = 0)]
        
        public int CdAlertaInv { get; set; }

        [DataMember]
        public int CdProduto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime UltData { get; set; }

        
        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdTipoAlerta { get; set; }

        [DataMember]
        public int QtdEstoque { get; set; }

        
        public int CdAlertaStatus { get; set; }

        public virtual AlertaGeral AlertaGeral { get; set; }

        [DataMember]
        public virtual AlertaStatus AlertaStatus { get; set; }

        [DataMember]
        public virtual AlertaTipo AlertaTipo { get; set; }

        //[DataMember]
        //public virtual ICollection<AlertaQuarentena> tbAlertaQuarentena { get; set; }

        [DataMember]
        public virtual Pessoa Pessoa { get; set; }
    }
}
