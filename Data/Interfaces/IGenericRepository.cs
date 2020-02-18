using System;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TicketManager.Data
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> List();
        Task<T> Get(int id);
        Task<IEnumerable<T>> Find(int id, Expression<Func<T, bool>> expr);

        Task<int> Add(T entity);

        Task<int> Update(T entity);

        Task<int> Delete(T entity);
    }
}