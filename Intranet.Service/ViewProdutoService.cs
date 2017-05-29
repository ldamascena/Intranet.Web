using Intranet.Domain.Entities;
using Intranet.Domain.Interfaces.Repositories;
using Intranet.Domain.Interfaces.Services;
using Intranet.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Service
{
    public class ViewProdutoService : ServiceBase<ViewProduto>, IViewProdutoService
    {
        private readonly IViewProdutoRepository _repository;

        public ViewProdutoService(IViewProdutoRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }
    }
}
