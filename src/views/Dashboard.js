import React from 'react';
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo';

import Habits from '../components/Habits';

const GET_HABITS = gql`
  query getHabits(
    $user: String!
  ) {
    habits(
      user: $user
    ) {
      _id
      user
      title
    }
  }
`;

const CREATE_HABIT = gql`
  mutation createHabit(
    $user: String!
    $title: String!
  ) {
    createHabit(input: {
      user: $user,
      title: $title
    }) {
      user
      title
    }
  }
`;

const GetHabit = ({ user }) => {
  if (!user) return false;

  return (
    <Query
      query={GET_HABITS}
      variables={{ user }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <Habits
            data={data.habits}
          />
        )
      }}
    </Query>
  )
}

const CreateHabit = ({ user }) => {
  if (!user) return false;

  let input;

  const onSubmit = (e, createHabit) => {
    e.preventDefault();
    createHabit({
      variables: {
        title: input.value,
        user: user
      }
    });
    input.value = '';
  }

  return (
    <Mutation mutation={CREATE_HABIT}>
      {(createHabit, { data }) => (
        <form
          onSubmit={e => {
            onSubmit(e, createHabit)
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Create Habit</button>
        </form>
      )}
    </Mutation>
  )
}

class Dashboard extends React.Component{
  state = {
    profile: {}
  }

  componentWillMount = () => {
    const {
      auth
    } = this.props;

    if (!auth.isAuthenticated()) auth.login();

    const {
      userProfile,
      getProfile
    } = auth;

    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    }
  }

  render = () => {
    const {
      profile
    } = this.state;

    if (!profile) return false;

    return (
      <div>
        <GetHabit user={profile.sub} />
        <CreateHabit user={profile.sub} />
      </div>
    )
  };
}

export default Dashboard;
