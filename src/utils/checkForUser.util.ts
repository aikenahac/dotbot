import Member from '../api/api';
import client from '../main';

async function checkForUser(id: string) {
  const member = (await Member.get(id)).id;
  const user = await client.users.cache.find((user: any) => user.id === id);

  if (member) return;

  await Member.create(user.tag, id);
}

export default checkForUser;
