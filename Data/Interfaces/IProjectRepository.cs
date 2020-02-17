using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManager.Models;

namespace TicketManager.Data
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        bool Exists(int id);
        Task<IEnumerable<AppUser>> GetMembers(int id);
        Task SetMembers(int id, List<AppUser> usersToAdd);
    }
}