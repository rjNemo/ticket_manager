using System;
using System.ComponentModel.DataAnnotations;

namespace TicketManager.DTO
{
    public class NewProjectDTO
    {
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime EndingDate { get; set; }

        public Guid ManagerId { get; set; }
    }
}