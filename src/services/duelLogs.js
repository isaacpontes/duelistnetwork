const token = process.env.DATO_READ_ONLY_API_TOKEN;

async function queryUserDuelLogs(id) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{
        allDuelLogs (filter: {
          opponent: { eq: "${id}" }
        }) {
          id
          comment
          victory
          createdAt
          author {
            id
            name
            avatarUrl
          }
          opponent {
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

  return response.data.allDuelLogs;
}

async function saveDuelLog(newDuelLog) {
  const data = await fetch('/api/duel-logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDuelLog)
  }).then(response => response.json());

  return data;
}

export { queryUserDuelLogs, saveDuelLog };
