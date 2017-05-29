using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class CentralContext : DbContext
    {
        public CentralContext()
            : base("CentralContext")
        {

        }

        //public virtual DbSet<OrdemServicoDTO> Produtos { get; set; }
        public virtual DbSet<Alerta> Alertas { get; set; }
        public virtual DbSet<AlertaInversao> AlertasInversao { get; set; }
        public virtual DbSet<Pessoa> Pessoas { get; set; }
        public virtual DbSet<AlertaGeral> AlertasGeral { get; set; }
        public virtual DbSet<AlertaHistorico> AlertasHistorico { get; set; }
        public virtual DbSet<AlertaTipo> AlertasTipo { get; set; }
        public virtual DbSet<EstoqueFisico> EstoquesFisico { get; set; }
        public virtual DbSet<EstoqueMovimento> EstoquesMovimento { get; set; }
        public virtual DbSet<Produto> Produtos { get; set; }
        public virtual DbSet<ClassificacaoProduto> ClassificacaoProdutos { get; set; }
        public virtual DbSet<SolUsuario> SolUsuarios { get; set; }
        public virtual DbSet<PessoaJuridica> PessoasJuridica { get; set; }
        public virtual DbSet<Vendedor> Vendedores { get; set; }
        public virtual DbSet<ViewProduto> ViewProdutos { get; set; }
        public virtual DbSet<EmpresaFilial> EmpresaFiliais { get; set; }
        public virtual DbSet<AlertaManual> AlertaManuais { get; set; }
        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            #region Relationships

            //Alerta Inversão com Pessoa

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasInversao)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            //Alerta Histórico com Pessoa

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasHistorico)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            //Alerta Manual com Pessoa

            modelBuilder.Entity<Pessoa>()
                .HasMany(e => e.AlertasManual)
                .WithRequired(e => e.Pessoa)
                .HasForeignKey(e => e.CdPessoaFilial)
                .WillCascadeOnDelete(false);

            //Alerta Histórico com Alerta Tipo

            modelBuilder.Entity<AlertaTipo>()
                .HasMany(e => e.AlertasHistorico)
                .WithRequired(e => e.AlertaTipo)
                .HasForeignKey(e => e.CdTipoAlerta)
                .WillCascadeOnDelete(false);

            //ClassificacaoProduto com ClassificacaoProduto

            modelBuilder.Entity<ClassificacaoProduto>()
                .HasMany(e => e.ClassificacaoProduto1)
                .WithOptional(e => e.ClassificacaoProduto2)
                .HasForeignKey(e => new { e.CdEmpresaPai, e.CdClassificacaoProdutoPai });

            //ClassificacaoProduto com SolUsuario

            modelBuilder.Entity<SolUsuario>()
                .HasMany(e => e.ClassificacaoProdutos)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.CdComprador)
                .WillCascadeOnDelete(false);

            //Vendedor com SolUsuario

            modelBuilder.Entity<SolUsuario>()
                .HasMany(e => e.Vendedores)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.CdComprador)
                .WillCascadeOnDelete(false);

            //Vendedor com PessoaJuridica

            //modelBuilder.Entity<PessoaJuridica>()
            //    .HasMany(e => e.Vendedores)
            //    .WithRequired(e => e.PessoaJuridica)
            //    .HasForeignKey(e => e.CdPessoaJuridica)
            //    .WillCascadeOnDelete(false);

            #endregion
        }
    }
}
