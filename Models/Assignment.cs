namespace TicketManager.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Project Project { get; set; }
        public int ProjectId { get; set; }
    }
}