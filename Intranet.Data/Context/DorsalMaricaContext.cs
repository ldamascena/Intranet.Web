using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class DorsalMaricaContext : DbContext 
    {
        public DorsalMaricaContext()
            : base("DorsalMaricaContext")
        { }

        public virtual DbSet<Operador> Operadores { get; set; }
    }
}
