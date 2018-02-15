using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Sol_Prod")]
    public partial class CadSolProd
    {
        [DataMember]
        [Key]
        public int Id { get; set; }

        [DataMember]
        public int IdCadSolProd { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Descricao { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Comprador { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Fornecedor { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string Abastecimento { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string ConcSensibilidade { get; set; }

        [DataMember]
        public decimal? Custo { get; set; }

        [DataMember]
        public decimal? Venda { get; set; }

        [DataMember]
        [Required]
        [StringLength(50)]
        public string Embalagem { get; set; }

        [DataMember]
        public int? QtdEmbalagem { get; set; }

        [DataMember]
        public decimal? Peso { get; set; }

        [DataMember]
        public decimal? Altura { get; set; }

        [DataMember]
        public decimal? Largura { get; set; }

        [DataMember]
        public decimal? Comprimento { get; set; }

        [DataMember]
        public decimal? Lastro { get; set; }

        [DataMember]
        public decimal? Camadas { get; set; }

        [DataMember]
        [Required]
        public string Mix { get; set; }

        [DataMember]
        public string Caracteristica { get; set; }

        [DataMember]
        [Required]
        [StringLength(100)]
        public string JustificativaResumida { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public int IdStatus { get; set; }

        [DataMember]
        public virtual SitCadProd SitCadProd { get; set; }

        [DataMember]
        public int IdUsuario { get; set; }

        [DataMember]
        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public DateTime? DataCriacao { get; set; }

        [DataMember]
        public string Segmento { get; set; }

        [DataMember]
        public string TipoCadastro { get; set; }

        [DataMember]
        public int? IdUserLock { get; set; }

        [DataMember]
        public virtual Usuario UsuarioLock { get; set; }
    }
}
