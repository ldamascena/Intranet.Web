using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Sit_Cad_Prod")]
    public partial class SitCadProd
    {
        public SitCadProd()
        {
            CadSolProd = new HashSet<CadSolProd>();
            CadSolProdLogs = new HashSet<CadSolProdLog>();
            CadSolAlterProd = new HashSet<CadSolAlterProd>();
            CadSolAlterProdLog = new HashSet<CadSolAlterProdLog>();
            CadAssProd = new HashSet<CadAssProd>();
            CadAssProdLogs = new HashSet<CadAssProdLog>();
        }

        [DataMember]
        [Key]
        public int IdSitProd { get; set; }

        [DataMember]
        public string Situacao { get; set; }

        public virtual ICollection<CadSolProd> CadSolProd { get; set; }

        public virtual ICollection<CadSolProdLog> CadSolProdLogs { get; set; }

        public virtual ICollection<CadSolAlterProd> CadSolAlterProd { get; set; }

        public virtual ICollection<CadSolAlterProdLog> CadSolAlterProdLog { get; set; }

        public virtual ICollection<CadAssProd> CadAssProd { get; set; }

        public virtual ICollection<CadAssProdLog> CadAssProdLogs { get; set; }
    }
}
