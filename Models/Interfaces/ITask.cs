using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    // public interface ITask
    public abstract class ITask
    {
        int Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        DateTime CreationDate { get; }
        DateTime PlannedEnding { get; set; }
        List<Activity> Activities { get; set; }

        public virtual void AddLogEntry(string description)//, User user)
        {
            Activity Activity = new Activity()
            {
                Description = description,
                ActivityType = ActivityType.Undefined,
                // User = user,
            };
            Activities.Add(Activity);
        }
    }
}
