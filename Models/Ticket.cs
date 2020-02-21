using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TicketManager.Models
{
    public class Ticket : ITask
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Creation Date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime CreatedAt { get; private set; } = DateTime.Now;

        [DataType(DataType.Date)]
        [Display(Name = "Estimated Ending Date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime PlannedEnding { get; set; }

        public Status Status { get; set; } = Status.ToDo;
        public Impact Impact { get; set; } = Impact.Undefined;
        public Difficulty Difficulty { get; set; } = Difficulty.Undefined;
        public Category Category { get; set; } = Category.Undefined;

        // [Display(Name = "Created By")]
        // public AppUser Creator { get; set; }
        public Guid CreatorId { get; set; }

        [Display(Name = "Project")]
        public Project Project { get; set; }
        // public int ProjectId { get; set; }
        public List<Note> Notes = new List<Note>();

        public List<Activity> Activities = new List<Activity>();

        public List<File> Files = new List<File>();

        // Methods
        public List<AppUser> GetAssignees()
        {
            return Project.Assignments.Select(a => a.User).ToList();
        }
        public void GetLastUpdateTime() { throw new NotImplementedException("Not Implemented"); }
        public void Close()
        {
            Status = Status.Done;
        }
    }
}