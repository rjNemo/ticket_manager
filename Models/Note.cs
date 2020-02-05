using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created_at { get; } = DateTime.Now;

        public Ticket Ticket { get; set; }
    }
}