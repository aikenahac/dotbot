import Instagram from 'instagram-web-api';

export default async function InstagramChecker(
  username,
  password,
  account = 'fundl.si',
) {
  const client = new Instagram({ username, password });

  await client.login();
  console.log('logged in');

  const user = await client.getUserByUsername({ username: account });

  const userSkimmed = {
    username: user.username,
    profilePicture: user.profile_pic_url,
    biography: user.biography,
    website: user.external_url,
    fullName: user.full_name,
    followers: user.edge_followed_by.count,
    following: user.edge_follow.count,
    businessCategory: user.is_business_account
      ? user.business_category_name
      : 'Not a business acount',
  };
  return userSkimmed;
}
