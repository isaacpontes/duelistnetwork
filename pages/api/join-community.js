import { SiteClient } from 'datocms-client';

export default async function joinCommunity(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.DATO_FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const { profileId, communities } = request.body;

    await client.items.update(profileId, {
      communities: communities,
    });

    response.status(204);

    return;
  }

  response.status(404).json({
    message: 'Nothing here yet, sorry :('
  });
}
