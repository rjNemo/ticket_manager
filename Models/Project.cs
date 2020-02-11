using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace TicketManager.Models
{
    public class Project : ITask
    {
        public Project()
        {

        }
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [StringLength(200)]
        [Display(Name = "Short Description")]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = false)]
        public DateTime CreatedAt { get; private set; } = DateTime.Now;

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime PlannedEnding { get; set; }

        [Display(Name = "Progress")]
        public float Progression
        {
            get
            {
                return Tickets.Count() == 0 ? 0 :
                (float)this.Tickets.
                    Where(t => t.Status == Status.Done).Count()
                    / this.Tickets.Count()
                    * 100;
            }
        }

        [Display(Name = "Project Status")]
        public Status Status { get; set; } = Status.ToDo;

        [Display(Name = "Project Manager")]
        public User Manager { get; set; }
        public Guid ManagerId { get; set; }
        private List<Assignment> _assignments;
        public List<Assignment> Assignments { get; set; } = new List<Assignment>();
        // {
        //     get
        //     { return _assignments ?? new List<Assignment>(); }
        //     set
        //     { _assignments = value; }
        // }
        private List<Ticket> _tickets;
        public List<Ticket> Tickets
        {
            get
            { return _tickets ?? new List<Ticket>(); }
            set { _tickets = value; }
        }
        private List<History> _edits;
        public List<History> Edits
        {
            get
            { return _edits ?? new List<History>(); }
            set { _edits = value; }
        }
        private List<File> _files;
        public List<File> Files
        {
            get
            { return _files ?? new List<File>(); }
            set { _files = value; }
        }

        // Methods
        public List<User> GetMembers()
        {
            return this.Assignments.Select(a => a.User).ToList();
        }
        public void AddMembers(List<User> usersToAdd)
        {
            foreach (var user in usersToAdd)
            {
                Assignment newAssign = new Assignment()
                {
                    Project = this,
                    ProjectId = this.Id,
                    User = user,
                    UserId = user.Id
                };
                this.Assignments.Add(newAssign);
            }
        }
        public void RemoveMembers(List<User> membersToRemove)
        {
            this.Assignments.RemoveAll(a => membersToRemove.Contains(a.User));
        }

        public void SetMembers(List<User> projectMembers)
        {
            var currentProjectMembers = this.GetMembers();
            if (currentProjectMembers != null)
            {
                var membersToRemove = currentProjectMembers
                    .FindAll(
                        cp => !projectMembers.Contains(cp)
                    );
                this.RemoveMembers(membersToRemove);
            }

            this.AddMembers(projectMembers);
            // remove precedent members first
        }
        public int GetMembersCount() => this.GetMembers().Count();
        public void GetTicketsCount() => this.Tickets.Count();
        public void GetTicketsUpdates()
        { throw new NotImplementedException("Not Implemented"); }
        public void Close()
        {
            this.Status = Status.Done;
        }
    }
}