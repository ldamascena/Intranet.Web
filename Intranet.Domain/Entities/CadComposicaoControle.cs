using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Composicao_Controle")]
    public partial class CadComposicaoControle
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int? IdUsuario { get; set; }

        [DataMember]
        public int? IdUsuarioAlteracao { get; set; }

        [DataMember]
        [Column(TypeName = "money")]
        public decimal Valor { get; set; }

        [DataMember]
        public string Descricao { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public DateTime DataInclusao { get; set; }

        [DataMember]
        public DateTime? DataAlteracao { get; set; }

        [DataMember]
        public bool Baixa { get; set; }

        [DataMember]
        public DateTime? DataBaixa { get; set; }

        public virtual Usuario Usuario { get; set; }

        [DataMember]
        public virtual Usuario UsuarioAlteracao { get; set; }
    }
}
