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
        DateTime CreatedAt { get; }
        DateTime PlannedEnding { get; set; }
        List<History> Edits { get; set; }
    }
}
