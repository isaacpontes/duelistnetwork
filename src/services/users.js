const token = process.env.DATO_READ_ONLY_API_TOKEN;

async function queryAllProfiles() {
  const profiles = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
          allProfiles {
            id
            name
            avatarUrl
            googleId
            friends {
              id
            }
          }
        }`
    }),
  })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });

  return profiles.data.allProfiles;
}

async function queryUser(googleId) {
  const user = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
        profile (filter: {
          googleId: { eq: "${googleId}" }
        }) {
          id
          name
          avatarUrl
          communities {
            id
            title
            imageUrl
            slug
            author {
              id
              name
            }
          }
          friends {
            id
            googleId
            name
            avatarUrl
          }
        }
      }`
    }),
  })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });

  return user.data.profile;
}

async function saveUserProfile(profile) {
  const data = await fetch('/api/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile)
  }).then(response => response.json());

  return data;
}

async function joinCommunity(profileId, communities) {
  await fetch('/api/join-community', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profileId, communities })
  });
}

async function addFriend(userId, userFriends, friendId, friendFriends) {
  await fetch('/api/add-friend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, userFriends, friendId, friendFriends })
  });
}

export { queryAllProfiles, queryUser, saveUserProfile, joinCommunity, addFriend };