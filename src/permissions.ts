import { rule, shield } from 'graphql-shield';
import { getUserId } from './utils';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => {
    const userId = getUserId(context.req);
    return Boolean(userId);
  },
);

const rules = {
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    createMovie: isAuthenticated,
    updateMovie: isAuthenticated,
    deleteMovie: isAuthenticated,
  },
};

export { rules };