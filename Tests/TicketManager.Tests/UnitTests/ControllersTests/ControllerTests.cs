using System;
using System.Threading.Tasks;
using TicketManager.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace TicketManager._
{
    public class ControllersTests
    {

        public static void Wrapper(
            Func<DbContextOptions<AppDbContext>, Task> Test,
            Action<DbContextOptions<AppDbContext>> SeedDb)
        {
            // Create inMemory Test Database
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlite(connection)
                    .Options;

                // creates DB schema
                using (var context = new AppDbContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Seed DB usng one context instance
                SeedDb(options);

                // use another context instance to run the test
                Test(options);
            }
            finally
            {
                connection.Close();
            }
        }
    }
}