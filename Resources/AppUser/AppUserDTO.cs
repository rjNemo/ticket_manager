using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TicketManager.Models;

namespace TicketManager.Resources
{
    public class AppUserDTO
    {
        public AppUserDTO(AppUser user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Presentation = user.Presentation;
            Email = user.Email;
            Phone = user.Phone;
            CreationDate = user.CreationDate;
            Picture = user.Picture;
            Activities = user.Activities;
            Projects = user.GetProjects().Select(u => new ProjectDTORead(u)).ToList();
            Tickets = user.GetTickets().Select(u => new TicketDTORead(u)).ToList();
        }

        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public string Presentation { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreationDate { get; private set; } = DateTime.Now;

        public string Picture { get; set; }

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<ProjectDTORead> Projects { get; set; } = new List<ProjectDTORead>();

        public List<TicketDTORead> Tickets { get; set; } = new List<TicketDTORead>();
    }
}