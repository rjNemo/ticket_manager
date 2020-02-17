using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TicketManager.Models;

namespace TicketManager.Data
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> ListAsync();
        Task<Project> GetByIdAsync(int id);
        Task AddAsync(Project project);
        Task UpdateAsync(Project project);
        Task<int> DeleteAsync(int id);
        bool Exists(int id);

    }
}