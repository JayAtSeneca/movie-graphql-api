# Movie List Management GraphQL API

This project is a simple GraphQL API for managing a list of movies using NodeJS, Apollo GraphQL server, Prisma and PostgresSQL.

## Tech Stack

* Node.js
* Apollo GraphQL server
* Prisma
* PostgreSQL

## Requirements

* Node.js
* npm or yarn
* PostgreSQL

## Installation

1. Clone the repository: `git clone https://github.com/jayatseneca/movie-graphql-api.git`
2. nstall the dependencies: `cd movie-list-graphql-api`
and `npm install`
3. Create a .env file at the root of the project and set the environment variables: `DATABASE_URL=postgresql://username:password@localhost:5432/movielist`
4. Start the server: `npm start`

## Usage

You can use a GraphQL client to interact with the API. The API exposes the following queries and mutations:

### Queries

* `movies`: Returns a list of all movies in the database.

### Mutations

* `createMovie`: Creates a new movie.
* `updateMovie`: Updates an existing movie.
* `deleteMovie`: Deletes a movie.

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request.
