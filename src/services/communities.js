const token = process.env.DATO_READ_ONLY_API_TOKEN;

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
                query: `{
                    allCommunities(first: 6) {
                        id
                        title
                        imageUrl
                        slug
                    }
                    _allCommunitiesMeta {
                        count
                    }
                }`
            }),
        })
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        });

    return communities.data;
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

export { queryAllCommunities, saveCommunity };