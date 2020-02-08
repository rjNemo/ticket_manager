using System;
using System.Collections.Generic;
using System.Linq;

namespace TicketManager.Models
{
    public class Project : ITask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; } = DateTime.Now;
        public DateTime PlannedEnding { get; set; }
        public float Progression
        {
            get
            {
                return this.Tickets.Count() == 0 ? 0 : (float)this.Tickets.
                    Where(t => t.Status == Status.Done).Count()
                    / this.Tickets.Count()
                    * 100;
            }
        }
        public Status Status { get; set; } = Status.ToDo;

        public User Manager { get; set; }
        public int ManagerId { get; set; }
        private List<Assignment> _assignments;
        public List<Assignment> Assignments
        {
            get
            { return _assignments ?? new List<Assignment>(); }
            set
            { _assignments = value; }
        }
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
        public List<Assignment> AddMembers(List<User> usersToAdd)
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
            return this.Assignments;
        }
        public void RemoveMembers(List<User> membersToRemove)
        {
            this.Assignments.RemoveAll(a => membersToRemove.Contains(a.User));
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