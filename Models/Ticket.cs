using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public class Ticket : ITask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; } = DateTime.Now;
        public DateTime PlannedEnding { get; set; }

        public Status Status { get; set; } = Status.ToDo;
        public Impact Impact { get; set; } = Impact.Undefined;
        public Difficulty Difficulty { get; set; } = Difficulty.Undefined;
        public Category Category { get; set; } = Category.Undefined;

        public User Creator { get; set; }
        public Guid CreatorId { get; set; }
        // public Project Project { get; set; }
        // public int ProjectId { get; set; }
        private List<Note> _notes;
        public List<Note> Notes
        {
            get
            {
                return _notes ?? new List<Note>();
            }
            set { _notes = value; }
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
        private List<File> _files;
        public List<File> Files
        {
            get
            {
                return _files ?? new List<File>();
            }
            set { _files = value; }
        }

        // Methods
        public void GetAssignees() { throw new NotImplementedException("Not Implemented"); }
        public void GetLastUpdateTime() { throw new NotImplementedException("Not Implemented"); }
        public void Close() { throw new NotImplementedException("Not Implemented"); }
        public void AddFile() { throw new NotImplementedException("Not Implemented"); }
    }
}