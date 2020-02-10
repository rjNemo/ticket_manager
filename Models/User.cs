using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Presentation { get; set; }
        public DateTime Created_at { get; } = DateTime.Now;
        public byte[] Picture { get; set; }
        // public Role Role { get; set; }

        private List<Assignment> _assignments;
        public List<Assignment> Assignments
        {
            get
            {
                return _assignments ?? new List<Assignment>();
            }
            set { _assignments = value; }
        }

        private List<History> _edits;
        public List<History> Edits
        {
            get
            {
                return _edits ?? new List<History>();
            }
            set { _edits = value; }
        }

        // Methods
        public void GetProjects() { throw new NotImplementedException("Not Implemented"); }
        public void GetProjectMembers() { throw new NotImplementedException("Not Implemented"); }
        public void GetTickets() { throw new NotImplementedException("Not Implemented"); }


    }
}