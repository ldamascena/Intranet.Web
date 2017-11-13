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
    [Table("tbEstoqueFisico")]
    public partial class EstoqueFisico
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdPessoaFilial { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CdPessoaObra { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [DataMember]
        public int CdProduto { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 3)]
        public byte CdEmpresaProduto { get; set; }

        [Key]
        [Column(Order = 4)]
        [DataMember]
        public string CdEmbalagem { get; set; }

        [Key]
        [Column(Order = 5)]
        [DataMember]
        public decimal QtEmbalagem { get; set; }

        [DataMember]
        [Key]
        [Column(Order = 6)]
        public byte CdEstoqueTipo { get; set; }

        [DataMember]
        public decimal? QtEstoqueFisico { get; set; }

        [DataMember]
        public int? QtVolumesFisico { get; set; }

        [DataMember]
        public decimal? QtPedida { get; set; }

        [DataMember]
        public decimal? QtComprometida { get; set; }

        [DataMember]
        public DateTime? DtUltimaCompra { get; set; }

        [DataMember]
        public decimal? QtUltimaCompra { get; set; }

        //[DataMember]
        //public virtual Produto Produto { get; set; }
    }
}
