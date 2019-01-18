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
    [Table("VW_IANDEV_PRODUTO")]
    public class ViewProduto
    {
        [DataMember]
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int idProduto { get; set; }

        [Key]
        [Column(Order = 1)]
        public byte idEmpresa { get; set; }

        public long? CodigoBarras { get; set; }

        [DataMember]
        [StringLength(130)]
        public string Descricao { get; set; }

        [StringLength(8)]
        public string NCM { get; set; }

        [StringLength(30)]
        public string Fabricante { get; set; }

        public int? Modelo { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(2)]
        public string UnidadeEntrada { get; set; }

        [Key]
        [Column(Order = 3)]
        public decimal QuantidadeEntrada { get; set; }

        [Key]
        [Column(Order = 4)]
        [StringLength(2)]
        public string UnidadeSaida { get; set; }

        [Key]
        [Column(Order = 5)]
        [StringLength(1)]
        public string pesavel { get; set; }

        public DateTime? DataCadastro { get; set; }

        public DateTime? DataAlteracao { get; set; }

        [StringLength(80)]
        public string Departamento { get; set; }

        [StringLength(80)]
        public string Setor { get; set; }

        [StringLength(80)]
        public string Grupo { get; set; }

        [StringLength(80)]
        public string Familia { get; set; }

        [StringLength(80)]
        public string SubFamilia { get; set; }

        [Key]
        [Column(Order = 6)]
        [StringLength(1)]
        public string Situacao { get; set; }
    }
}
