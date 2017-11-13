using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Solidcon.Data.Context
{
    public class CentralContext : DbContext
    {
        public CentralContext()
            : base("CentralContext")
        {
            
        }


        #region Alertas

        #region Geral

        public virtual DbSet<AlertaGeral> AlertasGeral { get; set; }

        #endregion

        #region Inversão

        public virtual DbSet<AlertaInversaoHistorico> AlertasInversaoHistorico { get; set; }
        public virtual DbSet<AlertaInversao> AlertasInversao { get; set; }
        public virtual DbSet<VwAlertaInversaoAnalitico> VwAlertasInversaoAnalitico { get; set; }

        #endregion

        #region Ultimo Custo

        public virtual DbSet<AlertaUltimoCustoHistorico> AlertaUltimoCustoHistorico { get; set; }
        public virtual DbSet<AlertaUltimoCusto> AlertasUltimoCusto { get; set; }

        #endregion

        #region Outras

        public virtual DbSet<AlertaManual> AlertaManuais { get; set; }
        public virtual DbSet<AlertaHistorico> AlertasHistorico { get; set; }
        public virtual DbSet<AlertaTipo> AlertasTipo { get; set; }
        public virtual DbSet<AlertaQuarentena> AlertasQuarentena { get; set; }
        public virtual DbSet<AlertaStatus> AlertaStatus { get; set; }
        public virtual DbSet<AlertaBalanco> AlertasBalanco { get; set; }

        #endregion

        #endregion

        #region Estoque

        public virtual DbSet<EstoqueFisico> EstoquesFisico { get; set; }
        public virtual DbSet<EstoqueMovimento> EstoquesMovimento { get; set; }
        public virtual DbSet<EstoqueContabil> EstoquesContabil { get; set; }
        public virtual DbSet<EstoqueTipo> EstoqueTipos { get; set; }
        public virtual DbSet<LogAlteracaoCusto> LogAlteracaoCustos { get; set; }

        #endregion

        #region Classificacao produto

        public virtual DbSet<ClassificacaoProduto> ClassificacaoProdutos { get; set; }

        #endregion

        #region Produto

        public virtual DbSet<SuperProduto> SuperProdutos { get; set; }
        public virtual DbSet<Produto> Produtos { get; set; }

        #endregion

        #region Classificação Meta

        public virtual DbSet<ClassificacaoMeta> ClassificacaoMetas { get; set; }
        public virtual DbSet<VwClassificacaoMeta> VwClassificacaoMeta { get; set; }
        public virtual DbSet<VwClassificacaoMetaMes> VwClassificacaoMetaMes { get; set; }

        #endregion

        #region Sol

        public virtual DbSet<SolUsuario> SolUsuarios { get; set; }
        public virtual DbSet<SolLog> SolLogs { get; set; }
        public virtual DbSet<SolParametro> SolParametros { get; set; }

        #endregion

        public virtual DbSet<Pessoa> Pessoas { get; set; }

        
        public virtual DbSet<PessoaJuridica> PessoasJuridica { get; set; }
        public virtual DbSet<Vendedor> Vendedores { get; set; }
        public virtual DbSet<ViewProduto> ViewProdutos { get; set; }
        public virtual DbSet<EmpresaFilial> EmpresaFiliais { get; set; }
        


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            #region Relationships

            ////Alerta Manual com Pessoa

            //modelBuilder.Entity<Pessoa>()
            //    .HasMany(e => e.AlertasManual)
            //    .WithRequired(e => e.Pessoa)
            //    .HasForeignKey(e => e.CdPessoaFilial)
            //    .WillCascadeOnDelete(false);

            //Alerta Histórico com Pessoa

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasHistorico)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            //ClassificacaoProduto com ClassificacaoProduto

            modelBuilder.Entity<ClassificacaoProduto>()
                .HasMany(e => e.children)
                .WithOptional(e => e.ClassificacaoProduto2)
                .HasForeignKey(e => new { e.CdEmpresaPai, e.CdClassificacaoProdutoPai });

            //ClassificacaoProduto com SolUsuario

            modelBuilder.Entity<SolUsuario>()
                .HasMany(e => e.ClassificacaoProdutos)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.CdComprador)
                .WillCascadeOnDelete(false);

            ////Vendedor com SolUsuario

            //modelBuilder.Entity<SolUsuario>()
            //    .HasMany(e => e.Vendedores)
            //    .WithRequired(e => e.Usuario)
            //    .HasForeignKey(e => e.CdComprador)
            //    .WillCascadeOnDelete(false);


            ////Vendedor com PessoaJuridica

            ////modelBuilder.Entity<PessoaJuridica>()
            ////    .HasMany(e => e.Vendedores)
            ////    .WithRequired(e => e.PessoaJuridica)
            ////    .HasForeignKey(e => e.CdPessoaJuridica)
            ////    .WillCascadeOnDelete(false);


            modelBuilder.Entity<AlertaTipo>()
                .HasMany(e => e.AlertasInversao)
                .WithRequired(e => e.AlertaTipo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaStatus>()
                .HasMany(e => e.AlertaInversao)
                .WithRequired(e => e.AlertaStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasInversao)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaTipo>()
                .HasMany(e => e.AlertaUltimoCusto)
                .WithRequired(e => e.AlertaTipo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaStatus>()
                .HasMany(e => e.AlertaUltimoCusto)
                .WithRequired(e => e.AlertaStatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertaUltimoCusto)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);


            modelBuilder.Entity<AlertaInversao>()
                .HasMany(e => e.AlertasQuarentena)
                .WithRequired(e => e.AlertaInversao)
                .HasForeignKey(e => new { e.CdAlerta, e.CdPessoaFilial, e.CdTipoAlerta })
                .WillCascadeOnDelete(false);


            modelBuilder.Entity<AlertaUltimoCusto>()
                .HasMany(e => e.AlertasQuarentena)
                .WithRequired(e => e.AlertaUltimoCusto)
                .HasForeignKey(e => new { e.CdAlerta, e.CdPessoaFilial, e.CdTipoAlerta })
                .WillCascadeOnDelete(false);


            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertaQuarentena)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaTipo>()
                .HasMany(e => e.AlertaQuarentena)
                .WithRequired(e => e.AlertaTipo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AlertaGeral>()
                .HasMany(e => e.AlertasQuarentena)
                .WithRequired(e => e.AlertaGeral)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertaBalanco)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<EmpresaFilial>()
                .HasMany(x => x.EstoqueContabil)
                .WithRequired(x => x.EmpresaFilial)
                .HasForeignKey(x => x.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            //modelBuilder.Entity<SuperProduto>()
            //    .HasMany(x => x.EstoqueContabil)
            //    .WithRequired(x => x.SuperProduto)
            //    .HasForeignKey(x => new { x.CdSuperProduto, x.CdEmpresaProduto })
            //    .WillCascadeOnDelete(false);

            modelBuilder.Entity<SuperProduto>()
                .HasMany(e => e.EstoqueContabil)
                .WithRequired(e => e.SuperProduto)
                .HasForeignKey(e => new { e.CdSuperProduto, e.CdEmpresaProduto })
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<EstoqueTipo>()
                .HasMany(e => e.EstoqueContabil)
                .WithRequired(e => e.EstoqueTipo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SuperProduto>()
                .HasMany(e => e.Produto)
                .WithRequired(e => e.SuperProduto)
                .HasForeignKey(e => new { e.CdSuperProduto, e.CdEmpresa })
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.SolParametroPessoa)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);
            #endregion

        }
    }
}
