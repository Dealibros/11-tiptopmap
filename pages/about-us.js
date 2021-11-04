import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

const title = css`
  text-align: center;
  margin: 0.4rem;
`;

const form = css`
  border-radius: 3rem;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
  text-align: center;
  background-color: rgb(190, 199, 143);
  padding: 0.3rem 0 3rem 1rem;
  font-family: 'New Tegomin';
  box-shadow: 10px 10px 5px grey;
  align-items: right;
  margin: 5rem 0 0 1.5rem;
  padding: 2.5rem 10rem;
`;

const mainForm = css`
  display: block;
  text-align: center;
  margin-bottom: 6rem;
  margin-top: 2rem;
`;

const row = css`
  padding: 1rem 1rem;
  margin-top: 0;

  input {
    border-radius: 0.4rem;
    margin: 0.3rem;
    padding: 0.3rem 0.5rem;
    font-family: 'New Tegomin';
  }
`;

const textarea = css`
  border-radius: 0.4rem;
  margin-left: 0.4rem;
  padding: 1.8rem !important;
`;

const button = css`
  font-family: 'New Tegomin';
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
`;

export default function Contact(props) {
  return (
    <div>
      <div>
        <Layout username={props.username}>
          <Head>
            <title>About Ecommerce </title>
          </Head>

          <section css={mainForm}>
            <div>
              <form css={form}>
                <h1 css={title}>Contact Form</h1>
                <div>
                  <div css={row}>
                    <label htmlFor="name">Full Name</label>
                    <br />
                    <input
                      className="form-control"
                      id="name"
                      placeholder="Full name"
                      formcontrolname="name"
                    />
                  </div>
                  <div css={row}>
                    <label htmlFor="inputEmail4">Email</label>
                    <br />
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      formcontrolname="email"
                    />
                  </div>
                </div>

                <div css={row}>
                  <label htmlFor="subject">Subject</label>
                  <br />
                  <input
                    css={textarea}
                    type="Subject"
                    id="subject"
                    name="subject"
                  />
                </div>

                <button css={button}>Send</button>
              </form>
            </div>
          </section>
        </Layout>
      </div>
    </div>
  );
}

// This function redirects the user to the login page if he tries to access in this case the about page without being login.
export async function getServerSideProps(context) {
  const { getValidSessionByToken } = await import('../util/database');

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  console.log(session);

  if (!session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/login?returnTo=/about-us',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
