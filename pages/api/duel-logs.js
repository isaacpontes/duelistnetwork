import { SiteClient } from 'datocms-client';

export default async function DuelLogs(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.DATO_FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const { comment, victory, author, opponent } = request.body;

    const newRecord = await client.items.create({
      itemType: '977033',
      comment,
      victory,
      author,
      opponent,
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
