import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Errors } from '../util/types';
import { RegisterResponse } from './api/register';

const main = css`
  font-family: 'New Tegomin';
  text-align: center;
  margin-top: 0;
  width: 100vw;
  height: 82.5vh;
  background-image: url('../images/portada1.jpg');
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 30px;
`;

const wrap = css`
  margin-top: 1rem;
  margin-right: 5rem;
  background-color: #f3ecec;
  border-color: gray;
  color: #bf9dec;
  display: flex;
  max-width: 50%;
  flex-wrap: wrap;
  min-width: 400px;
  max-height: 550px;
  border-radius: 24px;
  flex-direction: column;
  align-items: center;
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
  width: 210px;
  border-radius: 8px;
  border: #3b3b3b;
  padding-left: 12px;
  outline: lightgray;
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
  font-family: 'New Tegomin';
  font-size: 1.5rem;
  color: red;
  margin: 1rem;
`;

type Props = {
  refreshUsername: () => void;
  username: string;
  csrfToken: string;
};

export default function RegisterPage(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout username={props.username}>
      <form
        css={formStyles}
        onSubmit={async (event) => {
          event.preventDefault();

          // This body underneath turns into req.body into register.ts. The API route

          const registerResponse = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstname: firstname,
              lastname: lastname,
              username: username,
              password: password,
              email: email,
              csrfToken: props.csrfToken,
            }),
          });

          const registerJson =
            (await registerResponse.json()) as RegisterResponse;

          if ('errors' in registerJson) {
            setErrors(registerJson.errors);
            return;
          }

          props.refreshUsername();

          router.push(`/map`);
        }}
      >
        <div>
          <div css={main}>
            <div css={wrap}>
              <h2 css={sign}>
                <u>Register</u>
              </h2>
              <div css={item}>
                <label>
                  <input
                    css={input}
                    placeholder="Name"
                    onChange={(event) => {
                      setFirstname(event.currentTarget.value);
                    }}
                    value={firstname}
                  />
                </label>
              </div>
              <div css={item}>
                <label>
                  <input
                    css={input}
                    placeholder="Family Name"
                    onChange={(event) => {
                      setLastname(event.currentTarget.value);
                    }}
                    value={lastname}
                  />
                </label>
              </div>
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
              <div css={item}>
                <label>
                  <input
                    css={input}
                    placeholder="Email"
                    onChange={(event) => {
                      setEmail(event.currentTarget.value);
                    }}
                    value={email}
                  />
                </label>
              </div>
              <div>
                <button css={button}>Register</button>
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
  const { getValidSessionByToken } = await import('../util/database');
  const { createToken } = await import('../util/csrf');
  // const sessionToken = context.req.cookies.sessionTokenRegister;

  // Redirect from HTTP to HTTPS on Heroku

  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionToken;

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
    props: {
      csrfToken: createToken(),
    },
  };
}
