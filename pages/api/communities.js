import { SiteClient } from 'datocms-client';

export default async function queryAllCommunities(request, response) {
    if (request.method === 'POST') {
        const TOKEN = process.env.DATO_API_TOKEN;
        const client = new SiteClient(TOKEN);

        const { title, imageUrl, slug } = request.body;

        const newRecord = await client.items.create({
            itemType: '972857',
            title,
            imageUrl,
            slug,
        });

        response.json({
            newRecord
        });

        return;
    }

    response.status(404).json({
        message: 'Nothing here yet, sorry :('
    })
}