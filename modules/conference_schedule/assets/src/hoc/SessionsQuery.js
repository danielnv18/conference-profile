import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const UN_SCHEDULE = gql`
  query unScheduleSessions($filter: EntityQueryFilterInput) {
    nodeQuery(filter: $filter) {
      entities {
        ... on NodeSession {
          uuid
          title
          fieldApproved
          fieldSpeakers {
            entity {
              ... on User {
                name
              }
            }
          }
          fieldTimeSlot {
            entity {
              ... on TaxonomyTermTimeSlot {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default function querySchedule(WrappedComponent) {
  return class SessionsQuery extends React.Component {
    render() {
      return (
        <Query query={UN_SCHEDULE}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <WrappedComponent
                sessions={data.nodeQuery.entities}
                {...this.props}
              />
            );
          }}
        </Query>
      );
    }
  };
}
