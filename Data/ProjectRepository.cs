using System.Threading.Tasks;
using TicketManager.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace TicketManager.Data
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _context;
        private readonly IQueryable<Project> _query;
        public ProjectRepository(AppDbContext context)
        {
            _context = context;
            _query = _context.Projects
                .Include(p => p.Assignments)
                    .ThenInclude(a => a.User)
                .Include(p => p.Tickets)
                .Include(p => p.Manager)
                .Include(p => p.Files);
        }

        public Task AddAsync(Project project)
        {
            _context.Projects.Add(project);
            return _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            Project project = await GetByIdAsync(id);
            _context.Projects.Remove(project);
            return await _context.SaveChangesAsync();
        }

        public async Task<Project> GetByIdAsync(int id)
        {
            return await _query.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Project>> ListAsync()
        {
            return await _query.ToListAsync();
        }

        public Task UpdateAsync(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
            return _context.SaveChangesAsync();
        }

        public bool Exists(int id)
        { return _context.Projects.Any(e => e.Id == id); }

    }
}