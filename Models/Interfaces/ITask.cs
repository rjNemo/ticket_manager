using System;
using System.Collections.Generic;

namespace TicketManager.Models
{
    public interface ITask
    {
        int Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        DateTime CreationDate { get; }
        DateTime EndingDate { get; set; }
        List<Activity> Activities { get; set; }
    }
}
