using System;

namespace TicketManager.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime UpdateDate { get; set; } = DateTime.Now;
        public ActivityType ActivityType { get; set; } = ActivityType.Undefined;
        public AppUser User { get; set; }
        public int UserId { get; set; }
    }
}