import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';
import { Errors, Session, User, UserWithPasswordHash } from './types';

setPostgresDefaultsOnHeroku();

// Read in the environment variables
// in the .env file, making it possible
// to connect to PostgreSQL
dotenvSafe.config();

// Type needed for the connection function below
declare module globalThis {
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

export async function insertRatings({
  user_id,
  restaurant_id,
  ratings,
}: {
  user_id: number;
  restaurant_id: number;
  ratings: number;
}) {
  const [rating] = await sql`
   INSERT INTO ratings
      (user_id, restaurant_id, ratings)

    VALUES
      (${user_id}, ${restaurant_id}, ${ratings})

    RETURNING
      id,
      user_id,
      restaurant_id,
      ratings
  `;

  return rating;
}

// show ratings average

export async function ratingsAverage(restaurantId: number) {
  const ratings = await sql`
  SELECT
  AVG(ratings)::numeric(10,0)


  FROM
  ratings

  WHERE

  restaurant_id = ${restaurantId}

  GROUP BY
  restaurant_id`;

  return camelcaseKeys(ratings);
}

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
// console.log(insertUser);

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

// for the profile - Crud Functions

export async function updateUser({
  firstname,
  lastname,
  username,
  email,
}: {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}) {
  const users = await sql<[User]>`
  UPDATE
    users
  SET
    firstname = ${firstname},
    lastname = ${lastname},
    username = ${username},
    email = ${email}
  WHERE
    username = ${username}
  RETURNING
    id,
    firstname,
    lastname,
    username,
    email
`;

  return camelcaseKeys(users[0]);
}

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

// delete restaurant button
export async function deleteRestaurant(id: number) {
  const theRestaurant = await sql`
    DELETE FROM
      restaurants
    WHERE
      id = ${id}
    RETURNING
      id
      `;
  return camelcaseKeys(theRestaurant[0]);
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
      firstname,
      lastname,
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

// ///////////////////////Restaurant Databases///////////////////////////

// To display  the restaurants that are already in the Database
// gCD
export async function getRestaurantsData() {
  const restaurantsData = await sql`
  SELECT * FROM restaurants;
  `;

  return restaurantsData.map((restaurant) => camelcaseKeys(restaurant));
}

export async function getRestaurant(id: number) {
  const restaurant = await sql`

    SELECT
    *
    FROM
    restaurants
    WHERE
    id = ${id};
    `;

  return restaurant.map((onerestaurant) => camelcaseKeys(onerestaurant));
}

// To add into the Database the new restaurants added.

export async function createRestaurants({
  restaurantname,
  addressplace,
  descriptionplace,
  photo,
  rating,
  price,
  website,
  latitude,
  longitude,
}: {
  restaurantname: string;
  addressplace: string;
  descriptionplace: string;
  photo: string;
  rating: string;
  price: string;
  website: string;
  latitude: string;
  longitude: string;
}) {
  const [restaurants] = await sql`
    INSERT INTO restaurants
      ( restaurantname, addressplace, descriptionplace, photo, rating, price, website, latitude, longitude)

    VALUES
      (${restaurantname}, ${addressplace}, ${descriptionplace}, ${photo},${rating}, ${price}, ${website}, ${latitude}, ${longitude})
    RETURNING
      restaurantname,
      addressplace,
      descriptionplace,
      photo,
      rating,
      price,
      website,
      latitude,
      longitude
  `;

  return camelcaseKeys(restaurants);
}

// Comments section

export async function createComment({
  comment,
  user_id,
  restaurant_id,
  username,
}: {
  // username: string;
  comment: string;
  user_id: number;
  restaurant_id: number;
  username: string;
}) {
  const theComment = await sql`
    INSERT INTO comments
      ( comment, user_id, restaurant_id, username)
    VALUES
      (${comment}, ${user_id}, ${restaurant_id}, ${username})

    RETURNING
      id,
      user_id,
      restaurant_id,
      comment,
      username;
  `;
  return camelcaseKeys(theComment[0]);
}

export async function getComment(restaurantId: number) {
  console.log('database', restaurantId);
  const comment = await sql`
    SELECT
    *
    FROM
    comments
    WHERE
     restaurant_id = ${restaurantId}
    `;
  // restaurantId column doesn't exist. First is the database
  return comment.map((commentFirst) => camelcaseKeys(commentFirst));
}

export async function deleteComment(id: number) {
  const comment = await sql`
    DELETE FROM
      comments
    WHERE
      id = ${id}
    RETURNING
      id
  `;
  return camelcaseKeys(comment[0]);
}

export async function updateComment({
  id,
  comment,
}: {
  id: number;
  comment: string;
}) {
  const editComment = await sql`
  UPDATE
    comments
  SET
    comment = ${comment}

  WHERE
    id = ${id}

  RETURNING
    id,
    comment
`;

  return camelcaseKeys(editComment[0]);
}
