// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// figure out for what was profile again
import { NextApiRequest, NextApiResponse } from 'next';
import { getUser2, getValidSessionByToken } from '../../util/database';
import { User } from '../../util/types';
import { RegisterResponse } from './register';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (req.method === 'GET') {
    // Be aware that only works when you are login
    console.log('cookiesnow', req.cookies);
    const token = req.cookies.sessionToken;
    const session = await getValidSessionByToken(token);

    if (!session) {
      res.status(404).send({
        errors: [{ message: 'Not a valid Session' }],
      });
      return;
    }

    const user = (await getUser2(session.userId)) as User | undefined;

    if (!user) {
      res.status(404).send({
        errors: [{ message: 'User not found' }],
      });
      return;
    }

    return res.status(200).send({ user: user });
  }
  return res.status(405);
}
