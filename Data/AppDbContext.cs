using Microsoft.EntityFrameworkCore;
using TicketManager.Models;

namespace TicketManager.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<History> Edits { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<File> Files { get; set; }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     base.OnModelCreating(builder);
        //     builder.Entity<Team>().HasKey(t => new { t.ProjectId, t.UserId });
        // }
    }
}