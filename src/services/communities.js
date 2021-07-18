const token = process.env.DATO_READ_ONLY_API_TOKEN;

async function queryAllCommunities() {
  const communities = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
          allCommunities {
            id
            title
            imageUrl
            slug
          }
        }`
    }),
  })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });

  return communities.data.allCommunities;
}

async function queryUserCommunities(googleId) {
  const userCommunities = await fetch('https://graphql.datocms.com/', {
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
          communities {
            id
            title
            imageUrl
            author {
              id
              name
            }
          }
        }
      }`
    }),
  })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });

  return userCommunities.data.profile.communities;
}

async function queryCommunityById(id) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
        community (filter: {
          id: { eq: "${id}" }
        }) {
          id
          title
          imageUrl
          slug
          author {
            id
            name
          }
        }
      }`
    }),
  })
    .then(res => res.json())
    .catch(error => {
      console.log(error);
    });

  return response.data.community;
}

async function saveCommunity(community) {
  const data = await fetch('/api/communities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(community)
  }).then(response => response.json());

  return data;
}

export { queryAllCommunities, queryUserCommunities, queryCommunityById, saveCommunity };
