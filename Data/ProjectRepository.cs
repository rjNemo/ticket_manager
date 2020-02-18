using System.Threading.Tasks;
using TicketManager.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TicketManager.Data
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        private readonly IQueryable<Project> _query;
        public ProjectRepository(AppDbContext context) : base(context)
        {
            _query = _dbSet
                .Include(p => p.Assignments).ThenInclude(a => a.User)
                .Include(p => p.Tickets)
                .Include(p => p.Manager)
                .Include(p => p.Files)
                .AsNoTracking();
        }

        public override async Task<Project> Get(int id)
        {
            return await _query.FirstOrDefaultAsync(p => p.Id == id);
        }

        public override async Task<IEnumerable<Project>> List()
        {
            return await _query.ToListAsync();
        }

        public bool Exists(int id)
        {
            return _dbSet.Any(e => e.Id == id);
        }

        public async Task<IEnumerable<AppUser>> GetMembers(int id)
        {
            Project project = await Get(id);
            return project.GetMembers();
        }
        public async Task SetMembers(int id, List<AppUser> usersToAdd)
        {
            Project project = await Get(id);
            project.SetMembers(usersToAdd);
        }
    }
}