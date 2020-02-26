using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
            CreatedAt = ticket.CreatedAt;
            PlannedEnding = ticket.PlannedEnding;
            Status = ticket.Status.ToString();
            Impact = ticket.Impact.ToString();
            Difficulty = ticket.Difficulty.ToString();
            Category = ticket.Category.ToString();
            CreatorId = ticket.CreatorId;
            Project = ticket.Project;
            Notes = ticket.Notes;
            Activities = ticket.Activities;
            Files = ticket.Files;
            Users = ticket.GetAssignees();
        }
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; private set; }

        [DataType(DataType.Date)]
        public DateTime PlannedEnding { get; set; }

        public string Status { get; set; }

        public string Impact { get; set; }

        public string Difficulty { get; set; }

        public string Category { get; set; }

        public Guid CreatorId { get; set; }

        public Project Project { get; set; }

        public List<Note> Notes { get; set; } = new List<Note>();

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<File> Files { get; set; } = new List<File>();

        public List<AppUser> Users { get; set; } = new List<AppUser>();
    }
}