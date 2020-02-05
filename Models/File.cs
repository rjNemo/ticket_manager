using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public class File
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public int Size { get; set; }
        public string Format { get; set; }

        public User AddedBy { get; set; }
        public int UserId { get; set; }
        // public ITask AddedTo { get; set; }
        // public int ITaskId { get; set; }
    }
}