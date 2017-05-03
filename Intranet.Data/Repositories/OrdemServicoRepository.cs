using Intranet.Data.Context;
using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Repositories
{
    public class OrdemServicoRepository : RepositoryBase<OrdemServicoDTO>, IOrdemServicoRepository
    {

        public OrdemServicoRepository(CentralContext context)
            : base(context)
        {

        }


        public IEnumerable<OrdemServicoDTO> GetQuery()
        {
            var result = Db.Produtos.SqlQuery(@"Select distinct 
								CONVERT(INT, ROW_NUMBER() OVER( ORDER BY query.IdProduto)) as Id,
								query.IdProduto, 
                                query.Descricao, 
                                query.Loja, 
                                query.QuantidadeEstoque, 
                                query.UltimaData, 
                                isnull(Alerta.status, 'Pendente') as Status, 
                                Alerta.observacao as Observacao
                                    from (Select distinct top 10
                                    tbNotaItem.cdProduto as IdProduto, 
                                    VW_IANDEV_PRODUTO.Descricao as Descricao, 
                                    VW_IANDEV_FORNECEDOR.NomeFantasia as Loja, 
                                    dbo.fnEstoqueFilial(tbNotaItem.cdPessoaFilial, 0, tbNotaItem.cdProduto, 10, 1) as QuantidadeEstoque, 
                                    UltimaChegada.ultimaData as UltimaData 
                                    from tbNotaItem

                                    inner join tbNota
                                    on tbNotaItem.cdNota = tbNota.cdNota and tbNotaItem.cdPessoaFilial = tbNota.cdPessoaFilial
                                    inner join tbNotaEntrada
                                    on tbNotaItem.cdNota = tbNotaEntrada.cdNotaEntrada and tbNotaEntrada.cdPessoaFilial = tbNotaItem.cdPessoaFilial
                                    inner join VW_IANDEV_PRODUTO
                                    on VW_IANDEV_PRODUTO.idProduto = tbNotaItem.cdProduto
                                    inner join VW_IANDEV_FORNECEDOR
                                    on VW_IANDEV_FORNECEDOR.idc1fornecedor = tbNotaItem.cdPessoaFilial
                                    inner join (Select 
	                                    tbNotaItem.cdProduto, tbNotaItem.cdPessoaFilial, MAX(tbNotaEntrada.dtChegada) as ultimaData
	                                    from tbNotaItem
	                                    inner join tbNota
	                                    on tbNotaItem.cdNota = tbNota.cdNota and tbNotaItem.cdPessoaFilial = tbNota.cdPessoaFilial
	                                    inner join tbNotaEntrada
	                                    on tbNotaItem.cdNota = tbNotaEntrada.cdNotaEntrada and tbNotaEntrada.cdPessoaFilial = tbNotaItem.cdPessoaFilial
	                                    where tbNotaEntrada.dtChegada BETWEEN CONVERT(DATE, GETDATE()) AND CONVERT(DATE,GETDATE())
	                                    group by tbNotaItem.cdPessoaFilial, tbNotaItem.cdProduto) as UltimaChegada
                                    on tbNotaItem.cdPessoaFilial = UltimaChegada.cdPessoaFilial and tbNotaItem.cdProduto = UltimaChegada.cdProduto and tbNotaEntrada.dtChegada = UltimaChegada.ultimaData
                                    where tbNotaItem.cdPessoaFilial not in(7, 8, 13)
                                    and tbNotaEntrada.dtChegada BETWEEN CONVERT(DATE, GETDATE()) AND CONVERT(DATE,GETDATE())
                                    and Descricao not like 'MP -%'
                                    and Departamento not in ('97-EM TRANSITO', '98-PATRIMONIAL', '12-USO CONSUMO', '14-PRODUCAO', '13-EMBALAGENS')
                                    and not exists(Select * 
				                                    from tbVendaPDV where cdproduto = tbNotaItem.cdProduto and cdPessoaFilial = tbNotaItem.cdPessoaFilial)

                                    UNION ALL

                                    Select 
                                    distinct top 10 tbVendaPDV.cdProduto as IdProduto, 
                                    VW_IANDEV_PRODUTO.Descricao as Descricao, 
                                    VW_IANDEV_FORNECEDOR.NomeFantasia as Loja, 
                                    dbo.fnEstoqueFilial(tbVendaPDV.cdPessoaFilial, 0, tbVendaPDV.cdProduto, 10, 1) as qtdEstoqueProduto, 
                                    UltimaVenda.ultimaData as UltimaData 
                                    from tbVendaPDV
                                    inner join VW_IANDEV_PRODUTO
                                    on VW_IANDEV_PRODUTO.idProduto = tbVendaPDV.cdProduto
                                    inner join VW_IANDEV_FORNECEDOR
                                    on VW_IANDEV_FORNECEDOR.idc1fornecedor = tbVendaPDV.cdPessoaFilial
                                    inner join (Select 
	                                    cdProduto, cdPessoaFilial, MAX(dtvenda) as ultimaData
	                                    from tbVendaPDV
	                                    where dtvenda BETWEEN CONVERT(DATE, GETDATE()) AND CONVERT(DATE,GETDATE())
	                                    group by cdPessoaFilial, cdProduto) as UltimaVenda
                                    on tbVendaPDV.cdPessoaFilial = UltimaVenda.cdPessoaFilial and tbVendaPDV.cdProduto = UltimaVenda.cdProduto and tbVendaPDV.dtVenda = UltimaVenda.ultimaData
                                    where dtvenda BETWEEN CONVERT(DATE, GETDATE()) AND CONVERT(DATE,GETDATE())
                                    and not exists(Select *
				                                    from tbNotaItem
				                                    inner join tbNotaEntrada
				                                    on tbNotaItem.cdNota = tbNotaEntrada.cdNotaEntrada and tbNotaEntrada.cdPessoaFilial = tbNotaItem.cdPessoaFilial
				                                    where tbNotaItem.cdPessoaFilial not in(7, 8, 13)
				                                    and tbNotaItem.cdProduto = tbVendaPDV.cdProduto and tbNotaItem.cdPessoaFilial = tbVendaPDV.cdPessoaFilial)
                                    AND Departamento not in('09-FABRICO', '11-SERVICO')) as query
                                    LEFT JOIN dbo.Alerta
                                    on query.IdProduto = Alerta.idProduto and query.Loja = Alerta.loja");

            return result;
        }

        //public IEnumerable<OrdemServicoDTO> GetQuery()
        //{
        //    var result = Db.Produtos.SqlQuery(@"Select distinct 
        //                        tbNotaItem.cdProduto as Id, 
        //                        VW_IANDEV_PRODUTO.Descricao as Descricao, 
        //                        VW_IANDEV_FORNECEDOR.NomeFantasia as Loja, 
        //                        dbo.fnEstoqueFilial(tbNotaItem.cdPessoaFilial, 0, tbNotaItem.cdProduto, 10, 1) as QuantidadeEstoque, 
        //                        UltimaChegada.ultimaData as UltimaData 
        //                        from tbNotaItem

        //                        inner join tbNota
        //                        on tbNotaItem.cdNota = tbNota.cdNota and tbNotaItem.cdPessoaFilial = tbNota.cdPessoaFilial
        //                        inner join tbNotaEntrada
        //                        on tbNotaItem.cdNota = tbNotaEntrada.cdNotaEntrada and tbNotaEntrada.cdPessoaFilial = tbNotaItem.cdPessoaFilial
        //                        inner join VW_IANDEV_PRODUTO
        //                        on VW_IANDEV_PRODUTO.idProduto = tbNotaItem.cdProduto
        //                        inner join VW_IANDEV_FORNECEDOR
        //                        on VW_IANDEV_FORNECEDOR.idc1fornecedor = tbNotaItem.cdPessoaFilial
        //                        inner join (Select 
        //                         tbNotaItem.cdProduto, tbNotaItem.cdPessoaFilial, MAX(tbNotaEntrada.dtChegada) as ultimaData
        //                         from tbNotaItem
        //                         inner join tbNota
        //                         on tbNotaItem.cdNota = tbNota.cdNota and tbNotaItem.cdPessoaFilial = tbNota.cdPessoaFilial
        //                         inner join tbNotaEntrada
        //                         on tbNotaItem.cdNota = tbNotaEntrada.cdNotaEntrada and tbNotaEntrada.cdPessoaFilial = tbNotaItem.cdPessoaFilial
        //                         where tbNotaEntrada.dtChegada BETWEEN CONVERT(DATE, DATEADD(DAY, -1, GETDATE())) AND CONVERT(DATE,GETDATE())
        //                         group by tbNotaItem.cdPessoaFilial, tbNotaItem.cdProduto) as UltimaChegada
        //                        on tbNotaItem.cdPessoaFilial = UltimaChegada.cdPessoaFilial and tbNotaItem.cdProduto = UltimaChegada.cdProduto and tbNotaEntrada.dtChegada = UltimaChegada.ultimaData
        //                        where tbNotaItem.cdPessoaFilial not in(7, 8, 13)
        //                        and tbNotaEntrada.dtChegada BETWEEN CONVERT(DATE, DATEADD(DAY, -1, GETDATE())) AND CONVERT(DATE,GETDATE())
        //                        and Descricao not like 'MP -%'
        //                        and Departamento not in ('97-EM TRANSITO', '98-PATRIMONIAL', '12-USO CONSUMO', '14-PRODUCAO', '13-EMBALAGENS')
        //                        and not exists(Select * 
        //                            from tbVendaPDV where cdproduto = tbNotaItem.cdProduto and cdPessoaFilial = tbNotaItem.cdPessoaFilial)

        //                        UNION ALL

        //                        Select 
        //                        distinct tbVendaPDV.cdProduto as Id, 
        //                        VW_IANDEV_PRODUTO.Descricao as Descricao, 
        //                        VW_IANDEV_FORNECEDOR.NomeFantasia as Loja, 
        //                        dbo.fnEstoqueFilial(tbVendaPDV.cdPessoaFilial, 0, tbVendaPDV.cdProduto, 10, 1) as qtdEstoqueProduto, 
        //                        UltimaVenda.ultimaData as UltimaData 
        //                        from tbVendaPDV
        //                        inner join VW_IANDEV_PRODUTO
        //                        on VW_IANDEV_PRODUTO.idProduto = tbVendaPDV.cdProduto
        //                        inner join VW_IANDEV_FORNECEDOR
        //                        on VW_IANDEV_FORNECEDOR.idc1fornecedor = tbVendaPDV.cdPessoaFilial
        //                        inner join (Select 
        //                         cdProduto, cdPessoaFilial, MAX(dtvenda) as ultimaData
        //                         from tbVendaPDV
        //                         where dtvenda BETWEEN CONVERT(DATE, DATEADD(DAY, -1, GETDATE())) AND CONVERT(DATE,GETDATE())
        //                         group by cdPessoaFilial, cdProduto) as UltimaVenda
        //                        on tbVendaPDV.cdPessoaFilial = UltimaVenda.cdPessoaFilial and tbVendaPDV.cdProduto = UltimaVenda.cdProduto and tbVendaPDV.dtVenda = UltimaVenda.ultimaData
        //                        where dtvenda BETWEEN CONVERT(DATE, DATEADD(DAY, -1, GETDATE())) AND CONVERT(DATE,GETDATE())
        //                        and not exists(Select *
        //                            from tbNotaItem
        //                            inner join tbNotaEntrada
        //                            on tbNotaItem.cdNota = tbNotaEntrada.cdNotaEntrada and tbNotaEntrada.cdPessoaFilial = tbNotaItem.cdPessoaFilial
        //                            where tbNotaItem.cdPessoaFilial not in(7, 8, 13)
        //                            and tbNotaItem.cdProduto = tbVendaPDV.cdProduto and tbNotaItem.cdPessoaFilial = tbVendaPDV.cdPessoaFilial)
        //                        AND Departamento not in('09-FABRICO', '11-SERVICO')");

        //    return result;
        //}
    }
}
