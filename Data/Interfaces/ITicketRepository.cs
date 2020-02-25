using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManager.Models;

namespace TicketManager.Data
{
    public interface ITicketRepository : IGenericRepository<Ticket>
    {
        bool Exists(int id);
    }
}