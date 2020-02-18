using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using TicketManager.Models;
using Microsoft.EntityFrameworkCore;

namespace TicketManager.Data
{
    public class TicketRepository : GenericRepository<Ticket>, ITicketRepository
    {
        private IQueryable<Ticket> _query;
        public TicketRepository(AppDbContext context) : base(context)
        {
            _query = _dbSet
                .Include(p => p.Project)
                    .ThenInclude(a => a.Assignments)
                        .ThenInclude(p => p.User)
                // .Include(p => p.Edits)
                // .Include(p => p.Notes)
                // .Include(p => p.Files)
                // .Include(p => p.Creator)
                ;
        }

        public override async Task<Ticket> Get(int id)
        {
            return await _query.FirstOrDefaultAsync(p => p.Id == id);
        }

        public override async Task<IEnumerable<Ticket>> List()
        {
            return await _query.ToListAsync();
        }

        public bool Exists(int id)
        {
            return _dbSet.Any(e => e.Id == id);
        }
    }
}