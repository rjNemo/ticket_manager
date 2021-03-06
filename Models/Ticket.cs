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
        public DateTime CreationDate { get; private set; } = DateTime.Now;

        [DataType(DataType.Date)]
        [Display(Name = "Estimated Ending Date"), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime EndingDate { get; set; }

        public Status Status { get; set; } = Status.ToDo;
        public Impact Impact { get; set; } = Impact.Undefined;
        public Difficulty Difficulty { get; set; } = Difficulty.Undefined;
        public Category Category { get; set; } = Category.Undefined;
        public string CreatorId { get; set; }

        [Display(Name = "Project")]
        public Project Project { get; set; }
        public List<Note> Notes { get; set; } = new List<Note>();

        public List<Activity> Activities { get; set; } = new List<Activity>();

        public List<File> Files { get; set; } = new List<File>();

        // Methods
        public List<AppUser> GetAssignees()
        {
            return Project.Assignments.Select(a => a.User).ToList();
        }
        public void GetLastUpdateTime() { throw new NotImplementedException("Not Implemented Yet."); }
        public void Close()
        {
            Status = Status.Done;
        }
    }
}