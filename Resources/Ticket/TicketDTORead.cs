using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TicketManager.Models;

namespace TicketManager.Resources
{
    public class TicketDTORead
    {
        public TicketDTORead(Ticket ticket)
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
            Notes = ticket.Notes;
            Files = ticket.Files;
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
        public List<Note> Notes { get; set; } = new List<Note>();

        public List<File> Files { get; set; } = new List<File>();
    }
}