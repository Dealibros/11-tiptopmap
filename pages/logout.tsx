import { GetServerSidePropsContext } from 'next';

// checked

// const backgroundPage = css`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   width: 100%;
//   z-index: -1;
//   margin: 0px;
//   background-color: #222629;
//   display: flex;
//   padding-top: 60px;
//   padding-bottom: 60px;
// `;

// const logoutStyle = css`
//   color: #86c232;
// `;
// const linkStyle = css`
//   color: #86c232;
//   text-decoration: underline;
// `;

type Props = {
  refreshUsername: () => void;
  username?: string;
};

export default function Logout(props: Props) {
  props.refreshUsername();

  return 'Logged out';
}

//   props.refreshUsername();

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { serialize } = await import('cookie');

  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    // fetch an api route called logout
    await fetch(`${process.env.BASE_URL}/api/logout`);

    context.res.setHeader(
      'Set-Cookie',
      serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
