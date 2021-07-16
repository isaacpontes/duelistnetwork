const token = process.env.NEXT_PUBLIC_DATO_API_TOKEN;

async function queryAllCommunities() {
    const communities = await fetch(
        'https://graphql.datocms.com/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: '{ allCommunities(first: 6) { id title imageUrl } _allCommunitiesMeta { count } }'
            }),
        })
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        });

    return communities.data;
}

export { queryAllCommunities };