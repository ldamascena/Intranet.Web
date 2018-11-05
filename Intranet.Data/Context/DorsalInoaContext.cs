using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class DorsalInoaContext : DbContext 
    {
        public DorsalInoaContext()
            : base("DorsalInoaContext")
        { }

        public virtual DbSet<Operador> Operadores { get; set; }
    }
}
