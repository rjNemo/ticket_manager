using System;
using TicketManager.Data;
using TicketManager.Models;
using Microsoft.EntityFrameworkCore;

namespace TicketManager._
{
    public class SeedDb
    {
        public static void Projects(DbContextOptions<AppDbContext> options)
        // Seed DB usng one context instance
        {
            using (var context = new AppDbContext(options))
            {
                context.Projects.AddRange(
                    new Project()
                    {
                        Id = 1,
                        Title = "Secret Project",
                        Description = "Shht Don't Ask don't tell",
                        PlannedEnding = new DateTime(2021, 7, 21)
                    },
                    new Project()
                    {
                        Id = 2,
                        Title = "Public Project",
                        Description = "It's quite obvious, isn't it?!",
                        PlannedEnding = new DateTime(2036, 6, 16)
                    });
                context.SaveChanges();
            }
        }
    }
}