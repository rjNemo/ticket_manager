using System;

namespace TicketManager.Models
{
    public class Assignment
    {
        public AppUser User { get; set; }
        public Guid UserId { get; set; }
        public Project Project { get; set; }
        public int ProjectId { get; set; }
    }
}