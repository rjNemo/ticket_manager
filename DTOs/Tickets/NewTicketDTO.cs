using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TicketManager.Models;

namespace TicketManager.DTO
{
    public class NewTicketDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime EndingDate { get; set; }

        public string Impact { get; set; }

        public string Difficulty { get; set; }

        public string Category { get; set; }

        public Guid CreatorId { get; set; }
        public int ProjectId { get; set; }
    }
}