using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TicketManager.Models;

namespace TicketManager.DTO
{
    public class TicketDTO
    {
        public TicketDTO(Ticket ticket)
        {
            Id = ticket.Id;
            Title = ticket.Title;
            Description = ticket.Description;
            CreationDate = ticket.CreationDate;
            EndingDate = ticket.EndingDate;
            Status = ticket.Status.ToString();
            Impact = ticket.Impact.ToString();
            Difficulty = ticket.Difficulty.ToString();
            Category = ticket.Category.ToString();
            CreatorId = ticket.CreatorId;
            // Project = new ProjectDTORead(ticket.Project);
            Notes = ticket.Notes;
            Activities = ticket.Activities;
            Files = ticket.Files;
            // Users = ticket.GetAssignees().Select(u => new AppUserDTORead(u)).ToList();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreationDate { get; private set; }

        [DataType(DataType.Date)]
        public DateTime EndingDate { get; set; }

        public string Status { get; set; }

        public string Impact { get; set; }

        public string Difficulty { get; set; }

        public string Category { get; set; }

        public Guid CreatorId { get; set; }

        public ProjectDTORead Project { get; set; }

        public List<Note> Notes { get; set; } = new List<Note>();

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<File> Files { get; set; } = new List<File>();

        public List<AppUserDTORead> Users { get; set; } = new List<AppUserDTORead>();
    }
}