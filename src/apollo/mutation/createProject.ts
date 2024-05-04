import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
mutation CreateMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
    }
  }
  
`;