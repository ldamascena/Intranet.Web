using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Runtime.Serialization;

namespace Intranet.Domain.Entities
{
    [DataContract]
    [Table("Cad_Agendamento_Estoque_Itens")]
    public partial class CadAgendamentoEstoqueItens
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdAgendamento { get; set; }

        [DataMember]
        public int Codigo { get; set; }

        [DataMember]
        public string Produto { get; set; }

        [DataMember]
        public string Filial { get; set; }

        [DataMember]
        public int CodigoFilial { get; set; }

        [DataMember]
        public decimal? QtdEstoqueMinimo { get; set; }

        [DataMember]
        public decimal? QtdEstoqueMinimoProposto { get; set; }
    }
}
