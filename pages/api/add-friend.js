import { SiteClient } from 'datocms-client';

export default async function addFriend(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.DATO_FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const { userId, friendId } = request.body;

    const userRecord = await client.items.find(userId);
    const friendRecord = await client.items.find(friendId);

    if (!userRecord.friends.includes(friendId) && !friendRecord.friends.includes(userId)) {

      const updatedUserFriends = [friendId, ...userRecord.friends];
      const updatedFriendFriends = [userId, ...friendRecord.friends];

      await client.items.update(userId, {
        friends: updatedUserFriends,
      });

      await client.items.update(friendId, {
        friends: updatedFriendFriends,
      });

      return response.json({ message: 'OK', updated: true });
    }

    return response.json({ message: 'OK', updated: false });
  }

  response.status(404).json({
    message: 'Nothing here yet, sorry :('
  });
}
