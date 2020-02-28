using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TicketManager.Models
{
    public class Project : ITask
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [StringLength(200)]
        [Display(Name = "Short Description")]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}",
        ApplyFormatInEditMode = false)]
        public DateTime CreationDate { get; private set; } = DateTime.Now;

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}",
        ApplyFormatInEditMode = true)]
        public DateTime EndingDate { get; set; }

        [Display(Name = "Progress")]
        public decimal Progression
        {
            get
            {
                return Tickets.Count() == 0 ? 0 :
                (decimal)this.Tickets.
                    Where(t => t.Status == Status.Done).Count()
                    / this.Tickets.Count() * 100;
            }
        }

        [Display(Name = "Project Status")]
        public Status Status { get; set; } = Status.ToDo;

        [Display(Name = "Project Manager")]
        public AppUser Manager { get; set; }

        [JsonIgnore]
        public List<Assignment> Assignments { get; set; } = new List<Assignment>();

        public List<Ticket> Tickets { get; set; } = new List<Ticket>();

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<File> Files { get; set; } = new List<File>();

        // Methods
        public List<AppUser> GetMembers()
        {
            return this.Assignments.Select(a => a.User).ToList();
        }

        public void AddMembers(List<AppUser> usersToAdd)
        {
            foreach (var user in usersToAdd)
            {
                Assignment newAssign = new Assignment
                {
                    Project = this,
                    ProjectId = this.Id,
                    User = user,
                    UserId = user.Id
                };
                this.Assignments.Add(newAssign);
                user.Assignments.Add(newAssign);
            }
        }

        public void RemoveMembers(List<AppUser> membersToRemove)
        {
            this.Assignments.RemoveAll(a => membersToRemove.Contains(a.User));
        }

        public void SetMembers(List<AppUser> projectMembers)
        {
            var currentProjectMembers = this.GetMembers();
            if (currentProjectMembers != null)
            {
                var membersToRemove = currentProjectMembers
                    .FindAll(
                        cp => !projectMembers.Contains(cp)
                    );
                this.RemoveMembers(membersToRemove);

                var membersToAdd = projectMembers.FindAll(
                    pm => !currentProjectMembers.Contains(pm)
                );
                this.AddMembers(membersToAdd);
            }
            else
            {
                this.AddMembers(projectMembers);
            }
        }

        public void GetTicketsUpdates()
        { throw new NotImplementedException("Not Implemented"); }

        public void Close()
        {
            this.Status = Status.Done;
        }
    }
}