import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { LoginResponse } from './api/login';

// All checked

const main = css`
  font-family: 'New Tegomin';
  text-align: center;
  margin-top: 0;
  width: 100vw;
  height: 85vh;
  background-image: url('../images/portada1.jpg');
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 30px;

  @media (min-width: 801px) and (max-width: 1100px) {
    height: 89.5vh;
  }
`;

const wrap = css`
  background-color: #f3ecec;
  border-color: gray;
  color: #bf9dec;
  margin-right: 5rem;
  display: flex;
  max-width: 50%;
  flex-wrap: wrap;
  min-width: 400px;
  max-height: 350px;
  border-radius: 24px;
  flex-direction: column;
  align-items: center;
  margin-top: 4.5rem;

  @media (min-width: 400px) and (max-width: 600px) {
    margin-right: 0rem;
    display: flex;
    flex-wrap: wrap;
    min-width: 300px;
  }

  @media (min-width: 601px) and (max-width: 800px) {
    margin-right: 3rem;
    display: flex;
    flex-wrap: wrap;
    min-width: 400px;
    margin-top: 10rem;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    margin-right: 3rem;
    display: flex;
    flex-wrap: wrap;
    min-width: 500px;
    margin-top: 20rem;
    max-height: 420px;
    padding-top: 1.8rem;
  }
`;

const sign = css`
  font-weight: 300;
  font-size: 32px;
`;

const item = css`
  margin: 16px;
`;

const input = css`
  font-family: 'New Tegomin';
  height: 32px;
  width: 200px;
  border-radius: 8px;
  border: #3b3b3b;
  padding-left: 12px;
  outline: lightgray; //try to change color here
`;

const button = css`
  border-radius: 8px;
  margin: 16px;
  width: 100px;
  height: 32px;
  background-color: #c2a9e2;
  color: white;
  border: none;
  font-weight: 200;
  font-size: 16px;
  &:hover {
    background-color: #240a2e;
  }
`;

const formStyles = css`
  label {
    display: block;
  }
`;

const errorsStyles = css`
  color: red;
`;

type Props = {
  refreshUsername: () => void;
  username?: string;
};

export default function LoginPage(props: Props) {
  // changes top
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout username={props.username}>
      <form
        css={formStyles}
        onSubmit={async (event) => {
          event.preventDefault();

          // Send the username and password to the API
          // for verification

          const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const loginJson = (await loginResponse.json()) as LoginResponse;

          if ('errors' in loginJson) {
            setErrors(loginJson.errors);
            return;
          }

          const destination =
            typeof router.query.returnTo === 'string' && router.query.returnTo
              ? router.query.returnTo
              : `/`;

          props.refreshUsername();
          // Navigate to the user's page when
          // they have been successfully created
          router.push(destination);
        }}
      >
        <div>
          <div css={main}>
            <div css={wrap}>
              <h2 css={sign}>
                <u>Log In</u>
              </h2>
              <div css={item}>
                <label>
                  <input
                    css={input}
                    placeholder="Username"
                    onChange={(event) => {
                      setUsername(event.currentTarget.value);
                    }}
                    value={username}
                  />
                </label>
              </div>
              <div css={item}>
                <label>
                  <input
                    css={input}
                    placeholder="Password"
                    type="password"
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                    }}
                    value={password}
                  />
                </label>
              </div>
              <div>
                <button css={button}> Log In </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div css={errorsStyles}>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
    </Layout>
  );
}

// If there is a valid session in the database. And you try to get into this page => login it should redirect you to the page you choose underneath.
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  const sessionToken = context.req.cookies.sessionToken;

  const { getValidSessionByToken } = await import('../util/database');

  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }
  // If there is a valid session in the database. And you try to get into this page => login it should redirect you to the page you choose underneath.
  const session = await getValidSessionByToken(sessionToken);

  console.log(session);

  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
