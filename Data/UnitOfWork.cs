using System;
using System.Threading.Tasks;

namespace TicketManager.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Projects = new ProjectRepository(_context);
        }

        public IProjectRepository Projects { get; private set; }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.DisposeAsync();
        }
    }
}