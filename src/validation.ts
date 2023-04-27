import { UserInputError } from 'apollo-server-express';

function validatePagination(skip: number | undefined, take: number | undefined) {
  if (skip !== undefined && skip < 0) {
    throw new UserInputError('Skip value must be greater than or equal to 0');
  }

  if (take !== undefined && take < 1) {
    throw new UserInputError('Take value must be greater than 0');
  }
}

export { validatePagination };
