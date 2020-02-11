using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public class History
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime UpdateDate { get; set; } = DateTime.Now;
        public ActivityType ActivityType { get; set; } = ActivityType.Undefined;
        public User User { get; set; }
        public int UserId { get; set; }
    }
}