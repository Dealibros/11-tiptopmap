import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import { verifyCsrfToken } from '../../util/csrf';
import {
  createSession,
  deleteExpiredSessions,
  getUserWithPasswordHashByUsername,
  insertUser,
} from '../../util/database';
import { Errors } from '../../util/types';

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type RegisterResponse = { errors: Errors } | { user: User };

// The API Route needs to define the response
// that is returned to the user
export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  console.log('req.body', req.body);

  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email
  ) {
    res.status(400).send({
      errors: [
        { message: 'Request does not contain all information required' },
      ],
    });
    return;
  }

  if (!req.body.csrfToken || !verifyCsrfToken(req.body.csrfToken)) {
    res.status(400).send({
      errors: [{ message: 'Request does not contain valid CSRF token' }],
    });
    return;
  }

  try {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    console.log('req.body', req.body);

    const existingUser = await getUserWithPasswordHashByUsername(username);

    if (existingUser) {
      res.status(400).send({
        errors: [{ message: 'Username already exists' }],
      });
      return;
    }

    const passwordHash = await hashPassword(req.body.password);

    const user = await insertUser({
      username: username,
      passwordHash: passwordHash,
      firstname: firstname,
      lastname: lastname,
      email: email,
    });

    // clean old sessions
    deleteExpiredSessions();

    if (!user) {
      res.status(500).send({ errors: [{ message: 'User not create' }] });
      return;
    }

    // Create the record in the sessions table with a new token
    // 1. create the token
    const token = crypto.randomBytes(64).toString('base64');
    // 2. do a DB query to add the session record
    const newSession = await createSession(token, user.id);
    // set the response to create the cookie in the browser
    const cookie = createSerializedRegisterSessionTokenCookie(newSession.token);

    res.status(200).setHeader('set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
