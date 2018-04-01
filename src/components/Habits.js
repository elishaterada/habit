import React from 'react';

const Habits = ({
  data,
}) => {
  if (!data) return `No habits found`;
  return data.map(({ title, user }) => (
    <div key={title}>
      <p>{title}</p>
    </div>
  ));
}

export default Habits;
