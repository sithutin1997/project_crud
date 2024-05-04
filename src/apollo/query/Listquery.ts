import { gql } from "@apollo/client";

export const PROJECT_LIST_QUERY = gql`
query ProjectListQuery {
  listProjects {
    items {
      name
      description
      id
    }
  }
}
`;