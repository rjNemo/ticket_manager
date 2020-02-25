using System;
using System.Threading.Tasks;

namespace TicketManager.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IProjectRepository Projects { get; }
        IAppUserRepository AppUsers { get; }
        ITicketRepository Tickets { get; }
        Task<int> Complete();
    }
}