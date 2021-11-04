import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import { Errors, Session, User, UserWithPasswordHash } from './types';

// needs to check what is not needed here
// good
// finished

// Read in the environment variables
// in the .env file, making it possible
// to connect to PostgreSQL
dotenvSafe.config();

// Type needed for the connection function below
declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we're in development, make sure that we connect only
    // once to the database
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      username,
      firstname,
      lastname,
      email
    FROM
      users;
  `;
  return users.map((user) => {
    return camelcaseKeys(user);
  });
}

// keep. Table to get the user information. Profile

export async function getUser(username: string) {
  const [user] = await sql<[User]>`
    SELECT
      id,
      username,
      firstname,
      lastname,
      email
    FROM
      users
    WHERE
      username = ${username};
  `;

  return camelcaseKeys(user);
}

export async function getUser2(id: number) {
  const [user] = await sql<[User]>`
    SELECT
      id,
      username,
      firstname,
      lastname,
      email
    FROM
      users
    WHERE
      id = ${id};
  `;

  return camelcaseKeys(user);
}
export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      username
      firstname,
      lastname,
      email,
      password_hash
      FROM
      users
    WHERE
      username = ${username};
  `;
  return user && camelcaseKeys(user);
}

// export async function getUserWithPasswordHashByUsername(username: string) {
//   const [user] = await sql<[UserWithPasswordHash | undefined]>`
//     SELECT
//       id,
//       username,
//       password_hash
//     FROM
//       users
//     WHERE
//       username = ${username};
//   `;
//   return user && camelcaseKeys(user);
// }

export async function getUserBySessionToken(sessionToken: string | undefined) {
  if (!sessionToken) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username
    FROM
      sessions,
      users
    WHERE
      sessions.token = ${sessionToken} AND
      sessions.user_id = users.id
  `;
  return user && camelcaseKeys(user);
}

// not sure about this one. its there
// export async function createUser({
//   name,
//   favoriteColor,
// }: {
//   name: string;
//   favoriteColor: string;
// }) {
//   const users = await sql`
//     INSERT INTO users
//       (name, favorite_color)
//     VALUES
//       (${name}, ${favoriteColor})
//     RETURNING
//       id,
//       name,
//       favorite_color;
//   `;
//   return camelcaseKeys(users[0]);
// }

// First Table to get new users in registration
export async function insertUser({
  username,
  passwordHash,
  firstname,
  lastname,
  email,
}: {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  passwordHash: string;
}) {
  const [user] = await sql<[User]>`
    INSERT INTO users
      (username, password_hash, firstname, lastname, email)

    VALUES
      (${username}, ${passwordHash}, ${firstname}, ${lastname}, ${email})
    RETURNING
      id,
      username,
      firstname,
      lastname,
      email;

  `;

  return user;
}
console.log(insertUser);

export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const session = await getValidSessionByToken(token);

  if (!session) return undefined;

  // once we have the session, we want to get the user information we call another function and pass the session.userId
  return await getUser2(session.userId); // changed this double check
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

// export async function updateUserById(
//   id: number,
//   {
//     name,
//     favoriteColor,
//   }: {
//     name: string;
//     favoriteColor: string;
//   },
// ) {
//   const users = await sql`
//     UPDATE
//       users
//     SET
//       name = ${name},
//       favorite_color = ${favoriteColor}
//     WHERE
//       id = ${id}
//     RETURNING
//       id,
//       name,
//       favorite_color;
//   `;
//   return camelcaseKeys(users[0]);
// }
// for the profile Keep it
export async function deleteUserByUserName(username: string) {
  const users = await sql`
    DELETE FROM
      users
    WHERE
      username = ${username}
    RETURNING
      username
  `;
  return camelcaseKeys(users[0]);
}

export async function getUserByUsernameAndToken(
  username?: string,
  token?: string,
) {
  // Security: If the user is not logged in, we do not allow access and return an error from the database function
  if (!token) {
    const errors: Errors = [{ message: 'Access denied' }];
    return errors;
  }

  // Return undefined if username is falsy
  // (for example, an undefined or '' value for the username)
  if (!username) return undefined;

  // Security: Retrieve user via the session token
  const userFromSession = await getUserByValidSessionToken(token);

  // If there is either
  // - no valid session mathing the token
  // - no user matching the valid session
  // return undefined
  if (!userFromSession) return undefined;

  // Retrieve all matching users from database
  // users could be an array with the matching user OR an empty array
  const users = await sql<[User | undefined]>`
    SELECT
      id,
      first_name,
      last_name,
      username,
      email
    FROM
      users
    WHERE
      username = ${username}
  `;

  // ? will test if the first user exists or not
  // it will be undefined in the case it cannot find a user
  // only in the case it can find a user, it will do the property access

  // to avoid the ?
  // first test if the user exists
  const user = users[0];
  // if it doesn't exist, stop the function by returning undefined
  if (!user) return undefined;

  // Security: Match ids of session user with user
  // corresponding to requested username
  if (user.id !== userFromSession.id) {
    const errors: Errors = [{ message: 'Access denied' }];

    return errors;
  }

  return camelcaseKeys(user);
}
// Seems like that only admins can manipulate this.
// Example of secure database function
export async function getCoursesByUserIdAndSessionToken(
  userId: number,
  sessionToken: string | undefined,
) {
  if (!sessionToken) return [];

  // Call another database function and then return early in case
  // the session doesn't exist
  //
  // This could be adapted for usage with an "admin" type role ????
  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    return [];
  }
}
// dont think either this one underneath is needed
//   const courses = await sql<Course[]>`
//     SELECT
//       courses.id,
//       courses.title,
//       courses.description
//     FROM
//       users,
//       users_courses,
//       courses
//     WHERE
//       users.id = ${userId} AND
//       users_courses.user_id = users.id AND
//       courses.id = users_courses.course_id;
//   `;
//   return courses.map((course) => camelcaseKeys(course));
// }

// To redirect to the right page if you are log in and yu have a valid session token *
export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
      SELECT
        *
      FROM
        sessions
      WHERE
        token = ${token} AND
        expiry_timestamp > NOW()
    `;
  return session && camelcaseKeys(session);
}

// *****Done and corrected******/
export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;

  return camelcaseKeys(session);
}
// ///////////////////////////////////////////////

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

// For the logout function

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session))[0];
}
console.log(insertUser);
