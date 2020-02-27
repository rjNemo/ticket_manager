using System;
using System.Linq;
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
            CreationDate = project.CreationDate;
            EndingDate = project.EndingDate;
            Progression = project.Progression;
            Status = project.Status.ToString();
            Manager = project.Manager != null ? new AppUserDTORead(project.Manager) : null;
            Users = project.GetMembers().Select(u => new AppUserDTORead(u)).ToList();
            Tickets = project.Tickets.Select(t => new TicketDTORead(t)).ToList();
            Activities = project.Activities;
            Files = project.Files;
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;

        public DateTime EndingDate { get; set; }

        public decimal Progression { get; set; }

        public string Status { get; set; }

        public AppUserDTORead Manager { get; set; }

        public List<AppUserDTORead> Users { get; set; } = new List<AppUserDTORead>();

        public List<TicketDTORead> Tickets { get; set; } = new List<TicketDTORead>();

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<File> Files { get; set; } = new List<File>();
    }
}