import { SiteClient } from 'datocms-client';

export default async function saveProfile(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.DATO_FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const { name, googleId, avatarUrl, friends, communities } = request.body;

    const newRecord = await client.items.create({
      itemType: '976590',
      name,
      googleId,
      avatarUrl,
      friends,
      communities,
    });

    response.json({
      newRecord
    });

    return;
  }

  response.status(404).json({
    message: 'Nothing here yet, sorry :('
  });
}
