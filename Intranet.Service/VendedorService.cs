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
    public class VendedorService : ServiceBase<Vendedor>, IVendedorService
    {
        private readonly IVendedorRepository _repository;

        public VendedorService(IVendedorRepository repository)
            : base(repository)
        {
            this._repository = repository;
        }

        public IEnumerable<Vendedor> GetVendedorByNome(string nome)
        {
            return _repository.GetVendedorByNome(nome);
        }

        public IEnumerable<Vendedor> GetVendedorByEmpresa(string empresa, string nome)
        {
            return _repository.GetVendedorByEmpresa(empresa, nome);
        }

        public void AtulizarVendedor(Vendedor obj)
        {
            var result = _repository.GetAll().Where(x => x.CdVendedor == obj.CdVendedor);

            foreach (var item in result)
            {
                item.DtAlteracao = DateTime.Now;
                item.Nome = obj.Nome;
                item.DDD = obj.DDD;
                item.Telefone = obj.Telefone;
                item.Email = obj.Email;
                _repository.Update(item);
            }
        }

        public void IncluirComprador(Vendedor obj)
        {
            var result = _repository.Get(x => x.Nome == obj.Nome && x.Empresa == obj.Empresa);

            if (_repository.Get(x => x.Nome == obj.Nome && x.CdComprador == obj.CdComprador) == null)
            {
                result.CdComprador = obj.CdComprador;
                result.DtInclusao = DateTime.Now;
                _repository.Add(result);
            }
        }

        public void ExcluirComprador(Vendedor obj)
        {
            var result = _repository.GetAll().Where(x => x.Nome == obj.Nome && x.CdComprador == obj.CdComprador);

            foreach (var item in result)
            {
                _repository.Remove(item);
            }
        }

        public void IncluirFornecedor(Vendedor obj)
        {
            var result = obj;

            if (_repository.Get(x => x.Nome == obj.Nome && x.Empresa == obj.Empresa) == null)
            {
                result.DtInclusao = DateTime.Now;
                _repository.Add(result);
            }
        }

        public void ExcluirEmpresa(Vendedor obj)
        {
            var result = _repository.GetAll().Where(x => x.Nome == obj.Nome && x.Empresa == obj.Empresa);

            foreach (var item in result)
            {
                _repository.Remove(item);
            }
        }

        public void AlterarStatus(Vendedor obj)
        {
            var result = _repository.GetAll().Where(x => x.CdVendedor == obj.CdVendedor);

            foreach (var item in result)
            {
                item.Status = obj.Status;
                item.DtAlteracao = DateTime.Now;

                _repository.Update(item);
            }
        }
    }
}
