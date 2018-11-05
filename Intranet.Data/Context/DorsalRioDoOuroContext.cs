using Intranet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Data.Context
{
    public class DorsalRioDoOuroContext : DbContext 
    {
        public DorsalRioDoOuroContext()
            : base("DorsalRioDoOuroContext")
        { }

        public virtual DbSet<Operador> Operadores { get; set; }
    }
}
