using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public class History
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime UpdateDate { get; } = DateTime.Now;
        public ActivityType ActivityType { get; set; } = (ActivityType)0;

        public User User { get; set; }
        public int UserId { get; set; }
        // public ITask Task { get; set; }
        // public int TaskId { get; set; }
    }
}