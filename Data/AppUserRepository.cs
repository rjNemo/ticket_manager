using System.Threading.Tasks;
using TicketManager.Models;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TicketManager.Data
{
    public class AppUserRepository : GenericRepository<AppUser>, IAppUserRepository
    {
        private readonly IQueryable<AppUser> _query;
        public AppUserRepository(AppDbContext context) : base(context)
        {
            _query = _dbSet
                .Include(p => p.Assignments)
                    .ThenInclude(a => a.Project)
                        .ThenInclude(p => p.Tickets)
                .Include(p => p.Edits)
                .AsNoTracking();
        }

        public async Task<AppUser> GetUser(Guid id)
        {
            return await _query.FirstOrDefaultAsync(p => p.Id == id);
        }

        public override async Task<IEnumerable<AppUser>> List()
        {
            return await _query.ToListAsync();
        }

        public bool Exists(Guid id)
        {
            return _dbSet.Any(e => e.Id == id);
        }
    }
}