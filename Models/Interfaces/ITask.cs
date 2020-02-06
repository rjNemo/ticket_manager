using System;

namespace TicketManager.Models
{
    public interface ITask
    {
        int Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        DateTime CreatedAt { get; }
        DateTime PlannedEnding { get; set; }
    }
}
