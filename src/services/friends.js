const token = process.env.DATO_READ_ONLY_API_TOKEN;

async function queryUserFriends(googleId) {
  const userFriends = await fetch('https://graphql.datocms.com/', {
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

  return userFriends.data.profile.friends;
}

export { queryUserFriends };
