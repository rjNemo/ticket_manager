using System;
using System.Threading.Tasks;
using TicketManager.Models;

namespace TicketManager.Data
{
    public interface IAppUserRepository : IGenericRepository<AppUser>
    {
        Task<AppUser> GetUser(Guid id);
        bool Exists(Guid id);
    }
}