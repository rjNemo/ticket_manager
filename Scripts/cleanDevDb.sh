rm -r Migrations
rm app.db
dotnet ef migrations add Migration1 
dotnet ef database update
dotnet run