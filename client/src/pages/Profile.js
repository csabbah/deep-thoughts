import React from 'react';

import FriendList from '../components/FriendList';

import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';

import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';

const Profile = () => {
  // destructuure the mutation function from ADD_FRIEND
  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();

  // When loading the data, if userParam exists, that means we are querying other users (endpoint params)
  // Whereas, if /profile path is visited (with no params), that means it's the user
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // Accept both logged in user data or other user data
  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
    // Literal translation = Navigate to > '/profile'
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-row justify-space-between mb-3">
      <h2 className="bg-dark text-secondary p-3 display-inline-block">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>
      {userParam && (
        <button className="btn ml-auto" onClick={handleClick}>
          Add Friend
        </button>
      )}
      <div className="col-12 mb-3 col-lg-8">
        <ThoughtList
          thoughts={user.thoughts}
          title={`${user.username}'s thoughts...`}
        />
      </div>

      <div className="col-12 col-lg-3 mb-3">
        <FriendList
          username={user.username}
          friendCount={user.friendCount}
          friends={user.friends}
        />
      </div>
      <div className="mb-3">{!userParam && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
