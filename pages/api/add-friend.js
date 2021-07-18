import { SiteClient } from 'datocms-client';

export default async function addFriend(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.DATO_FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const { userId, userFriends, friendId, friendFriends } = request.body;

    await client.items.update(userId, {
      friends: userFriends,
    });

    await client.items.update(friendId, {
      friends: friendFriends,
    });

    response.status(204);

    return;
  }

  response.status(404).json({
    message: 'Nothing here yet, sorry :('
  });
}
