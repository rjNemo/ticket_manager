using System;
using System.Threading.Tasks;

namespace TicketManager.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IProjectRepository Projects { get; }
        Task<int> Complete();
    }
}