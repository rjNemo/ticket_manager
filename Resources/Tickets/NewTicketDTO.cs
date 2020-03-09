using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TicketManager.Models;

namespace TicketManager.Resources
{
    public class NewTicketDTO
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime EndingDate { get; set; }

        public string Impact { get; set; }

        public string Difficulty { get; set; }

        public string Category { get; set; }
        [Required]
        public Guid CreatorId { get; set; }
        [Required]
        public int ProjectId { get; set; }
    }
}