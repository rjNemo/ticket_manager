using System;
using System.Linq;
using System.Collections.Generic;
using TicketManager.Models;

namespace TicketManager.Resources
{
    public class ProjectDTORequest
    {
        public ProjectDTORequest(Project project)
        {
            Id = project.Id;
            Title = project.Title;
            Description = project.Description;
            CreationDate = project.CreationDate;
            EndingDate = project.EndingDate;
            Progression = project.Progression;
            Status = project.Status.ToString();
            Manager = project.Manager != null ? new AppUserDTORead(project.Manager) : null;
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreationDate { get; private set; } = DateTime.Now;

        public DateTime EndingDate { get; set; }

        public decimal Progression { get; set; }

        public string Status { get; set; }

        public AppUserDTORead Manager { get; set; }
    }
}