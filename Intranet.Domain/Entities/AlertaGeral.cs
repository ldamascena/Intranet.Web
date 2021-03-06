﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("tbAlertaGeral")]
    public class AlertaGeral
    {
        public AlertaGeral()
        {
            //    AlertasHistorico = new HashSet<AlertaHistorico>();
            //    AlertaInversao = new HashSet<AlertaInversao>();
            //    AlertaUltimoCusto = new HashSet<AlertaUltimoCusto>();
            //AlertasQuarentena = new HashSet<AlertaQuarentena>();
        }

        [NotMapped]
        [Column(Order = 0)]
        public int CdAlertaGeral { get; set; }

        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdProduto { get; set; }

        [DataMember]
        [Required]
        public string NomeProduto { get; set; }

        [DataMember]
        public int Severidade { get; set; }

        [DataMember]
        [Column("alertaAberto")]
        public int AlertaEmAberto { get; set; }

        [DataMember]
        [Column(TypeName = "date")]
        public DateTime DataUltimoAlerta { get; set; }

        [DataMember]
        public int Pendente { get; set; }

        [DataMember]
        public int Analise { get; set; }

        [DataMember]
        public int Concluido { get; set; }

        [DataMember]
        public string Vinculado { get; set; }

        //[DataMember]
        //public virtual ICollection<AlertaQuarentena> AlertasQuarentena { get; set; }

        //[DataMember]
        //public virtual ICollection<AlertaHistorico> AlertasHistorico { get; set; }

        //[DataMember]
        //public virtual ICollection<AlertaInversao> AlertaInversao { get; set; }

        //[DataMember]
        //public virtual ICollection<AlertaUltimoCusto> AlertaUltimoCusto { get; set; }

        //[DataMember]
        //[Key]
        //[Column("cdAlertaGeral")]
        //public int CdAlertaGeral { get; set; }

        //[DataMember]
        //public int CdProduto { get; set; }

        //[DataMember]
        //public string NomeProduto { get; set; }

        //[DataMember]
        //public int Severidade { get; set; }

        //[DataMember]
        //[Column("alertaAberto")]
        //public int AlertaEmAberto { get; set; }

        //[DataMember]
        //[Column("dataUltimoAlerta")]
        //public DateTime DataDoUltimoAlerta { get; set; }

        //[DataMember]
        //public bool Alterado { get; set; }

        //[DataMember]
        //public virtual List<AlertaAnalitico> AlertaAnaliticos { get; set; }
    }
}
