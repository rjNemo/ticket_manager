using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TicketManager.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly AppDbContext _context;
        protected readonly DbSet<T> _dbSet;
        public GenericRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<int> Add(T entity)
        {
            _dbSet.Add(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(T entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            { _dbSet.Attach(entity); }
            _dbSet.Remove(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> Find(int id, Expression<Func<T, bool>> expr)
        {
            return await _dbSet.Where(expr).AsNoTracking().ToListAsync();
        }

        public virtual async Task<T> Get(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public virtual async Task<IEnumerable<T>> List()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<int> Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }
    }
}