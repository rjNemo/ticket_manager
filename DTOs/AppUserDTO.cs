using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TicketManager.Models;

namespace TicketManager.DTO
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
            Created_at = user.Created_at;
            Picture = user.Picture;
            Activities = user.Activities;
            Projects = user.GetProjects();
            Tickets = user.GetTickets();
        }

        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public string Presentation { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [DataType(DataType.Date)]
        public DateTime Created_at { get; private set; } = DateTime.Now;

        public string Picture { get; set; }

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<Project> Projects { get; set; } = new List<Project>();

        public List<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}