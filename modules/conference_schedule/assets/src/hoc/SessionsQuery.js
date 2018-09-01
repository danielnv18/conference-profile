import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const UN_SCHEDULE = gql`
  query scheduleSessions(
    $nodeFilter: EntityQueryFilterInput
    $termFilter: EntityQueryFilterInput
  ) {
    nodeQuery(filter: $nodeFilter) {
      entities {
        ... on NodeSession {
          uuid
          title
          fieldTimeSlot {
            entity {
              ... on TaxonomyTermTimeSlot {
                uuid
              }
            }
          }
        }
      }
    }
    taxonomyTermQuery(filter: $termFilter) {
      entities {
        ... on TaxonomyTermTimeSlot {
          uuid
          name
          fieldDateRange {
            startDate
            endDate
          }
        }
      }
    }
  }
`;

const variables = {
  nodeFilter: {
    conditions: [{ operator: "EQUAL", field: "type", value: ["session"] }]
  },
  termFilter: {
    conditions: [{ operator: "EQUAL", field: "vid", value: ["time_slot"] }]
  }
};

export default function querySchedule(WrappedComponent) {
  return class SessionsQuery extends React.Component {
    render() {
      return (
        <Query query={UN_SCHEDULE} variables={variables}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <WrappedComponent
                sessions={data.nodeQuery.entities}
                timeSlots={data.taxonomyTermQuery.entities}
                {...this.props}
              />
            );
          }}
        </Query>
      );
    }
  };
}
