import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_HABITS = gql`
  {
    habits {
      _id
      user
      title
    }
  }
`;

const Habits = () => (
  <Query
    query={GET_HABITS}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.habits.map(({ title, user }) => (
        <div key={title}>
          <p>{title} by {user}</p>
        </div>
      ));
    }}
  </Query>
);

export default Habits;
