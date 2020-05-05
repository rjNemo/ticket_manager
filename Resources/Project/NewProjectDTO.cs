using System;
using System.ComponentModel.DataAnnotations;

namespace TicketManager.Resources
{
    public class NewProjectDTO
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime EndingDate { get; set; }
        [Required]
        public string ManagerId { get; set; }
    }
}