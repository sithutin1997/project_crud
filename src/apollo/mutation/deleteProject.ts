import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
mutation DeleteMutation($input: DeleteProjectInput!) {
    deleteProject(input: $input) {
      id
      name
      description
    }
  }
`;