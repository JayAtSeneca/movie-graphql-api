import { IResolvers } from '@graphql-tools/utils';
import { PrismaClient } from '@prisma/client';
import { getUserId, generateToken, hashPassword, comparePassword } from './utils';

const prisma = new PrismaClient();

const resolvers: IResolvers = {
  Query: {
    movies: async () => {
      return prisma.movie.findMany();
    },
    movie: async (_, { id }) => {
      return prisma.movie.findUnique({ where: { id } });
    },
    me: async (_, __, { req }) => {
      const userId = getUserId(req);
      return prisma.user.findUnique({ where: { id: userId } });
    },
  },
  Mutation: {
    createMovie: async (_, { title, description, releaseDate, rating }) => {
      return prisma.movie.create({ data: { title, description, releaseDate, rating } });
    },
    updateMovie: async (_, { id, title, description, releaseDate, rating }) => {
      return prisma.movie.update({ where: { id }, data: { title, description, releaseDate, rating } });
    },
    deleteMovie: async (_, { id }) => {
      return prisma.movie.delete({ where: { id } });
    },
    signup: async (_, { name, email, password }) => {
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
      const token = generateToken(user.id);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = generateToken(user.id);
      return { token, user };
    },
  },
};

export default resolvers;
