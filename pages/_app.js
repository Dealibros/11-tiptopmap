import '../styles/globals.css';
import '../styles/style.css';
import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

// checked **

export default function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState();

  // Declare a function that we will use in any page or
  // component (via passing props) to refresh the
  // username (if it has gotten out of date)

  // USECALLBACK: this function prevents getting
  // a different reference on every rerender
  // (We do this to prevent calls to the API on
  // every page navigation)
  const refreshUsername = useCallback(async () => {
    // Call the API to retrieve the user information
    // by automatically passing along the sessionToken cookie
    const response = await fetch('/api/profile');
    const profile = await response.json();

    console.log('are you working profile?', profile);

    if ('errors' in profile) {
      console.log(profile.errors);
      setUsername(undefined);
      return;
    }

    // Set the username state variable which we can use
    // in other components via passing props
    setUsername(profile.user.username);
    console.log(profile.user.username);
  }, []);

  // Retrieve username information ONCE the first time
  // that a user loads the page
  useEffect(() => {
    refreshUsername();
  }, [refreshUsername]);

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            height: 100vh;
            width: 100vw;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto;
            font-size: 20px;
            letter-spacing: 1.4;
            word-spacing: 1.4;
            line-height: 1.4;
            color: rgba(0, 0, 0, 0.9);
          }
        `}
      />
      <Head>
        <link rel="icon" href="/images/sunshine.svg" />
      </Head>
      <Component
        {...pageProps}
        username={username}
        refreshUsername={refreshUsername}
      />
    </>
  );
}
