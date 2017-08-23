using System;
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
    [Table("tbLogAlteracaoCusto")]
    public partial class LogAlteracaoCusto
    {
        [DataMember]
        [Key]
        public int CdLog { get; set; }
        
        public int CdSuperProduto { get; set; }
        
        [StringLength(60)]
        public string NomeProduto { get; set; }
        
        public int CdPessoaFilial { get; set; }

        [Column(TypeName = "money")]
        public decimal? VlCustoAnterior { get; set; }

        [Column(TypeName = "money")]
        public decimal? VlCustoAtual { get; set; }

        public DateTime DtAlteracao { get; set; }
    }
}
