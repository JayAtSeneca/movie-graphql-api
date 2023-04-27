import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    description: String
    releaseDate: String
    rating: Float
    directorName: String
  }

  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    movies(
      search: String
      sortBy: MovieSortBy
      sortOrder: SortOrder
      skip: Int
      take: Int
    ): [Movie!]!
    movie(id: Int!): Movie
    me: User
  }

  type Mutation {
    createMovie(title: String!, description: String, releaseDate: String, rating: Float): Movie!
    updateMovie(id: Int!, title: String, description: String, releaseDate: String, rating: Float): Movie!
    deleteMovie(id: Int!): Movie!
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }

  enum MovieSortBy {
    id
    title
    releaseDate
    rating
  }

  enum SortOrder {
    ASC
    DESC
  }
`;

export default typeDefs;
