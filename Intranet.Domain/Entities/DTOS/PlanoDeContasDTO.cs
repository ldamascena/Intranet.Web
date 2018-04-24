using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Domain.Entities.DTOS
{
    public class PlanoDeContasDTO
    {
        public PlanoDeContasDTO()
        {
            children = new List<SegundoNivelDTO>();
        }

        [JsonIgnore]
        public Int64 Row { get; set; }

        public string NomeContabil { get; set; }

        public int? id { get; set; }

        [JsonIgnore]
        public string nmPessoa { get; set; }

        public decimal? Valor { get; set; }

        public decimal? ValorMesAnt { get; set; }
        
        public string VarMes { get; set; }

        public decimal? ValorAnoAnt { get; set; }

        public string VarAno { get; set; }

        [JsonIgnore]
        public int? MesNumber { get; set; }

        [JsonIgnore]
        public int? Ano { get; set; }

        public List<SegundoNivelDTO> children;
    }

    public class SegundoNivelDTO
    {

        public SegundoNivelDTO() {
            children = new List<TerceiroNivelDTO>();
        }

        [JsonIgnore]
        public Int64 Row { get; set; }

        public string NomeContabil { get; set; }

        public int? id { get; set; }

        [JsonIgnore]
        public int? CodigoContabilPai { get; set; }

        [JsonIgnore]
        public string nmPessoa { get; set; }

        public decimal? Valor { get; set; }

        public decimal? ValorMesAnt { get; set; }

        public string VarMes { get; set; }

        public decimal? ValorAnoAnt { get; set; }

        public string VarAno { get; set; }

        [JsonIgnore]
        public int? MesNumber { get; set; }

        [JsonIgnore]
        public int? Ano { get; set; }

        public List<TerceiroNivelDTO> children;
    }

    public class TerceiroNivelDTO
    {
        public TerceiroNivelDTO()
        {
            children = new List<QuartoNivelDTO>();
        }

        [JsonIgnore]
        public Int64 Row { get; set; }

        public string NomeContabil { get; set; }

        public int? id { get; set; }

        [JsonIgnore]
        public int? CodigoContabilPai { get; set; }

        public string nmPessoa { get; set; }

        public decimal? Valor { get; set; }

        public decimal? ValorMesAnt { get; set; }

        public string VarMes { get; set; }

        public decimal? ValorAnoAnt { get; set; }

        public string VarAno { get; set; }

        [JsonIgnore]
        public int? MesNumber { get; set; }

        [JsonIgnore]
        public int? Ano { get; set; }

        public List<QuartoNivelDTO> children;
    }

    public class QuartoNivelDTO
    {
        public QuartoNivelDTO()
        {
            children = new List<QuintoNivelDTO>();
        }

        [JsonIgnore]
        public Int64 Row { get; set; }

        public string NomeContabil { get; set; }

        public int? id { get; set; }

        [JsonIgnore]
        public int? CodigoContabilPai { get; set; }

        [JsonIgnore]
        public string nmPessoa { get; set; }

        public decimal? Valor { get; set; }

        public decimal? ValorMesAnt { get; set; }

        public string VarMes { get; set; }

        public decimal? ValorAnoAnt { get; set; }

        public string VarAno { get; set; }

        [JsonIgnore]
        public int? MesNumber { get; set; }

        [JsonIgnore]
        public int? Ano { get; set; }

        public List<QuintoNivelDTO> children;
    }

    public class QuintoNivelDTO
    {
        [JsonIgnore]
        public Int64 Row { get; set; }

        public string NomeContabil { get; set; }

        public int? id { get; set; }

        [JsonIgnore]
        public int? CodigoContabilPai { get; set; }

        public string nmPessoa { get; set; }

        public decimal? Valor { get; set; }

        public decimal? ValorMesAnt { get; set; }

        public string VarMes { get; set; }

        public decimal? ValorAnoAnt { get; set; }

        public string VarAno { get; set; }

        [JsonIgnore]
        public int? MesNumber { get; set; }

        [JsonIgnore]
        public int? Ano { get; set; }
    }
}
