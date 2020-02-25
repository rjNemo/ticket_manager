rm Controllers/AppUsersController.cs
rm Controllers/TicketsController.cs
rm Controllers/ProjectsController.cs
dotnet aspnet-codegenerator controller -name AppUsersController -async -api -m AppUser -dc AppDbContext -outDir Controllers  
dotnet aspnet-codegenerator controller -name TicketsController -async -api -m Ticket -dc AppDbContext -outDir Controllers  
dotnet aspnet-codegenerator controller -name ProjectsController -async -api -m Project -dc AppDbContext -outDir Controllers