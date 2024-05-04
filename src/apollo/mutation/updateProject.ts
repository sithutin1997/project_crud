import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
mutation updateMutation($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      name
    }
  }
`;