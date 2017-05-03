using Intranet.Domain.Interfaces;
using Intranet.Domain.Interfaces.Applications;
using Intranet.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intranet.Application
{
    public class AppBase<TEntity> : IAppBase<TEntity>, IUnitOfWorkServiceBase where TEntity : class
    {
        private readonly IServiceBase<TEntity> _service;

        public AppBase(IServiceBase<TEntity> service)
        {
            this._service = service;
        }

        public void Add(TEntity obj)
        {
            _service.Add(obj);
        }

        public IEnumerable<TEntity> Find(Func<TEntity, bool> expr)
        {
            return _service.Find(expr);
        }

        public TEntity Get(Func<TEntity, bool> expr)
        {
            return _service.Get(expr);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _service.GetAll();
        }

        public void Update(TEntity obj)
        {
            _service.Update(obj);
        }

        public void Remove(TEntity obj)
        {
            _service.Remove(obj);
        }
    }
}
