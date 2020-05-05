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

        public int Impact { get; set; }

        public int Difficulty { get; set; }

        public int Category { get; set; }
        [Required]
        public string CreatorId { get; set; }
        [Required]
        public int ProjectId { get; set; }
    }
}