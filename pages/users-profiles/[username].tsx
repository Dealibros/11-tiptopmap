import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Layout from '../../components/Layout';
import { Errors, User } from '../../util/types';

// import { SingleUserResponseType } from '../api/users-by-username/[username]';

export const pageContainer = css`
  font-family: 'New Tegomin';
  background-color: white;
  padding-top: 128px;
  padding-left: 128px;
  padding-right: 128px;
  @media (max-width: 768px) {
    padding: 96px 24px;
  }
`;

export const pageContainerWhite = css`
  background-color: white;
  height: 100vh;
  padding-top: 100px;
  padding-left: 128px;
  padding-right: 128px;
`;

export const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 64px;
  @media (max-width: 450px) {
    flex-direction: column-reverse;
    padding-top: 12px;
  }
`;

export const registrationForm = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding-bottom: 128px;
  label {
    display: flex;
    flex-direction: column;
    text-align: left;
    color: gray;
    font-weight: 500;
    input {
      margin: 5px 0 20px 0;
      width: 256px;
      padding: 12px 8px;
      transition: 0.3s ease-in-out;
      :focus {
        box-shadow: 0 0 10px grey;
        outline: none !important;
      }
    }
  }
  button {
    color: purple;
    display: flex;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 6rem;
    padding: 5rem;
  }
`;

export const imageContainer = css`
  width: 50%;
  @media (max-width: 450px) {
    padding-top: 32px;
  }
  img {
    width: 90%;
  }
`;

const contentContainer = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const containerLeft = css`
  width: 65%;
  margin-right: 24px;
  @media (max-width: 450px) {
    width: 100%;
  }
  h3 {
    margin-bottom: 64px;
  }
    @media (max-width: 768px) {
      margin-right: 12px;
    }
    @media (max-width: 450px) {
      margin-right: 0px;
      margin-top: 32px;
      width: 220px;
    }
  }
  .userInformation {
    margin-bottom: 64px;
    p {
      margin: 6px 0;
    }
  }
`;

const containerRight = css`
  width: 35%;
  padding-top: 48px;
  @media (max-width: 450px) {
    width: 100%;
  }
  img {
    width: 100%;
  }
`;

type Props = {
  user: User;
  username?: string;
  errors?: Errors[];
};

export type SingleUserResponseType = { user: User } | { errors: Errors[] };

export default function SingleUserProfile(props: Props) {
  const router = useRouter();

  // Show message if user not allowed
  const errors = props.errors;

  if (errors) {
    return (
      <Layout username={props.username}>
        <Head>
          <title>Error</title>
        </Head>
        <div css={pageContainer}>
          <h1>Error: {errors}</h1>
        </div>
      </Layout>
    );
  }

  // Show message if user does not exist
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!props.user) {
    return (
      <Layout username={props.username}>
        <Head>
          <title>User not found!</title>
        </Head>
        <div css={pageContainer}>
          <h1>User not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout username={props.username}>
      <Head>
        <title>
          Profile page for {props.user.firstname} {props.user.lastname}
        </title>
      </Head>
      <div css={pageContainer}>
        <div css={contentContainer}>
          <div css={containerLeft}>
            <h1>Welcome, {props.user.firstname}!</h1>

            <div className="userInformation">
              <p>Username: {props.user.username}</p>
              <p>First name: {props.user.firstname}</p>
              <p>Last name: {props.user.lastname}</p>
            </div>

            {/* CREATE Seed */}
            <button css="button">
              Edit
              {/* Edit Account */}
            </button>
            <button
              css="button"
              onClick={async (event) => {
                event.preventDefault();
                if (
                  !window.confirm(`Do you really want to delete your account?`)
                ) {
                  return;
                }

                const response = await fetch(
                  `/api/users-by-username/${props.user.username}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: props.user.username,
                    }),
                  },
                );

                await response.json();

                router.push(`/`);
              }}
            >
              {' '}
              <RiDeleteBin5Line /> Delete account
            </button>
          </div>
          <div css={containerRight}>
            <img src="/register.svg" css="Image" alt="welcome" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUser } = await import('../../util/database');

  console.log(context.query.userId);

  const user = await getUser(context.query.username);
  console.log();
  // const response =
  // Since we're fetching on the server side,
  // the browser is not a part of this fetch
  // and it is therefore not sending the cookies along
  //
  // This is using the node-fetch library internally
  //

  // await fetch(
  //   `${process.env.BASE_URL}/users-profiles/${context.query.username}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       // This forwards the cookie to the API route
  //       cookie: context.req.headers.cookie || '',
  //     },
  //   },
  // );
  // console.log('hola', context.query.username);
  // const json = (await response.json()) as SingleUserResponseType;

  // console.log('API decoded JSON from response', json);

  // // checking for a property called errors inside object json
  // if ('errors' in json) {
  //   context.res.statusCode = 403;
  // } else if (!json.user) {
  //   // Return a proper status code for a response
  //   // with a null user (which indicates it has
  //   // not been found in the database)
  //   context.res.statusCode = 404;
  // }

  return {
    props: {
      user,
      // json is an object with a user property OR an error property
      // if it has an error property, it's still rendering
      // ...json,
    },
  };
}
