import { SiteClient } from 'datocms-client';

export default async function saveCommunity(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.DATO_FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const { title, imageUrl, slug, author } = request.body;

    const newRecord = await client.items.create({
      itemType: '972857',
      title,
      imageUrl,
      slug,
      author,
    });

    const authorRecord = await client.items.find(author);
    const updatedCommunities = [newRecord.id, ...authorRecord.communities];
    console.log(updatedCommunities);

    await client.items.update(author, {
      communities: updatedCommunities
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
