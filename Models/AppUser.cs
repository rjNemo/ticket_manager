using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TicketManager.Models
{
    public class AppUser
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Display(Name = "Full Name")]
        public string FullName => $"{FirstName} {LastName}";

        [StringLength(200)]
        [Display(Name = "Bio")]
        public string Presentation { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Member since"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime Created_at { get; private set; } = DateTime.Now;

        [Display(Name = "Avatar")]
        public byte[] Picture { get; set; }

        public List<Assignment> Assignments { get; set; } = new List<Assignment>();

        [Display(Name = "Activity")]
        public List<Activity> Activities { get; set; } = new List<Activity>();

        // Methods
        public List<Project> GetProjects()
        {
            return Assignments.Select(a => a.Project).ToList();
        }

        public List<Ticket> GetTickets()
        {
            var tickets = new List<Ticket>();
            GetProjects().ForEach(p => tickets.Concat(p.Tickets));
            return tickets;
        }
    }
}