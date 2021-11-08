import { GetServerSidePropsContext } from 'next';

// checked

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
