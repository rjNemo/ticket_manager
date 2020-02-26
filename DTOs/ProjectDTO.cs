using System;
using System.Collections.Generic;
using TicketManager.Models;

namespace TicketManager.DTO
{
    public class ProjectDTO
    {
        public ProjectDTO(Project project)
        {
            Id = project.Id;
            Title = project.Title;
            Description = project.Description;
            CreatedAt = project.CreatedAt;
            Progression = project.Progression;
            Status = project.Status.ToString();
            Manager = project.Manager;
            Users = project.GetMembers();
            Tickets = project.Tickets;
            Activities = project.Activities;
            Files = project.Files;
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; private set; } = DateTime.Now;

        public DateTime PlannedEnding { get; set; }

        public decimal Progression { get; set; }

        public string Status { get; set; }

        public AppUser Manager { get; set; }

        public List<AppUser> Users { get; set; } = new List<AppUser>();

        public List<Ticket> Tickets { get; set; } = new List<Ticket>();

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<File> Files { get; set; } = new List<File>();
    }
}