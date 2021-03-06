const token = process.env.DATO_READ_ONLY_API_TOKEN;

async function queryAllProfiles(page = 0, pageSize = 20) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
        allProfiles (
          first: ${pageSize}
          skip: ${page * pageSize}
        ) {
          id
          name
          avatarUrl
          googleId
          friends {
            id
          }
        }
        _allProfilesMeta {
          count
        }
      }`
    }),
  })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });

  return response.data;
}

async function queryProfilesByCommunityId(id) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
        allProfiles (filter: {
          communities: { anyIn: "${id}" }
        }) {
          id
          name
          avatarUrl
        }
      }`
    }),
  })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });

  return response.data.allProfiles;
}

async function queryProfileById(id) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
        profile (filter: {
          id: { eq: "${id}" }
        }) {
          id
          name
          avatarUrl
          communities {
            id
            title
            imageUrl
          }
          friends {
            id
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

  return response.data.profile;
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

async function joinCommunity(profileId, communityId) {
  const response = await fetch('/api/join-community', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profileId, communityId })
  })
    .then(response => response.json());

  return response;
}

async function addFriend(userId, friendId) {
  const response = await fetch('/api/add-friend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, friendId })
  })
    .then((response) => response.json());

  return response;
}

export { queryAllProfiles, queryProfilesByCommunityId, queryProfileById, queryUser, saveUserProfile, joinCommunity, addFriend };
