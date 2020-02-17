# TicketManager

## Software Requirement System

- [Follow the link](https://docs.google.com/presentation/d/1Gunf5MRJ_KcoFwo0x_vV8YVHnf9l0V8n7BiJGz6p4cI/edit?usp=sharing)

## API Documentation

### v1

- [Internal Link. Don't forget to update](https://localhost:5001/swagger)

## Features

## Supports

- Web
- Progressive Web App
- Mobile

## Technical Stack

- `React` client on the front-end (TypeScript)
- [Materialize](https://materializecss.com) CSS librairy for styling
- API: Newtonsoft.Json, to avoid cycle errors
- Hosting: ?
- Authentication : [Auth0](https://auth0.com/)
- Analytics : Google Analytics & Mixpanel

## Versions

### Features in v.0.1

## TO DO

- Write API tests using Postman: request + test, environment variables, mock server
- Annotate API request in controllers
- Annotate Properties in Models
- Write backend tests
- Have a Look at typeahead component
- Ensure Tickets Edits belong to Project Edits
- Ensure Tickets Files belong to Project Files
- Async model methods ?
- setMembers & removeMembers from project api not working
- Write a query class to refactor code and optimize perf on get queries (AsNoTracking)
- repository + strategy to decouple controllers from DbContext. Easier testing
