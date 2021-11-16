import { NextApiRequest, NextApiResponse } from 'next';
import { convertQueryValueString } from '../../../util/context';
import {
  deleteUserByUserName,
  getUser,
  getUserByUsernameAndToken,
  updateUser,
} from '../../../util/database';
import { Errors, User } from '../../../util/types';

export type SingleUserResponseType =
  | { user: User | null }
  | { errors: Errors[] };

export default async function singleUserHandler(
  req: NextApiRequest,
  res: NextApiResponse<SingleUserResponseType>,
) {
  // Retrieve username from the query string (the square bracket notation in the filename)
  console.log('query', req.query);
  const username = convertQueryValueString(req.query.username);
  console.log('something here?', username);
  // Retrieve the session token from the cookie that has been forwarded from the frontend (in getServerSideProps in the page component file)
  const token = convertQueryValueString(req.cookies.sessionToken);

  // Get either an array of errors OR a user
  const result = await getUserByUsernameAndToken(username, token);

  console.log('inside', result);

  if (req.method === 'GET') {
    const user = await getUser(username);
    console.log('user', user);

    return res.status(200).json({ user: user });
  } else if (req.method === 'PUT') {
    const user = await updateUser({
      username: username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,

      // req.body.email,
    });
    return res.status(200).json({ user: user });
  }

  // Delete user
  else if (req.method === 'DELETE') {
    if (username) {
      await deleteUserByUserName(username);
    }
  }

  // If we have received an array of errors, set the
  // response accordingly
  if (Array.isArray(result)) {
    return res.status(405).json;
  }

  // If we've successfully retrieved a user, return that
  return res.status(200).json({ user: result || null });
}
