import { SiteClient } from 'datocms-client';

export default async function joinCommunity(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.DATO_FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const { profileId, communityId } = request.body;

    const profileRecord = await client.items.find(profileId);

    if (!profileRecord.communities.includes(communityId)) {
      const updatedCommunities = [communityId, ...profileRecord.communities];

      await client.items.update(profileId, {
        communities: updatedCommunities,
      });

      return response.json({ message: 'OK', updated: true });
    }

    return response.json({ message: 'OK', updated: false });
  }

  response.status(404).json({
    message: 'Nothing here yet, sorry :('
  });
}
