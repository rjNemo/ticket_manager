using System;

namespace TicketManager.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
        public Project Project { get; set; }
        public int ProjectId { get; set; }
    }
}