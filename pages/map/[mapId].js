import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Comment from '../../components/Comment';
import Layout from '../../components/Layout';
import StarRating from '../../components/StarRating';

const title = css`
  font-family: 'New Tegomin';
  margin-top: 0.2rem;
  color: black;
  font-weight: 700;
  font-size: 4.3rem;
  text-align: center;
  margin-bottom: 0;
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 3rem;
  }

  @media (min-width: 801px) and (max-width: 1100px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

// positions the yellow card
const secondMain = css`
  display: flex;
  width: 100%;
  height: 103vh;
  margin-right: 0 auto;
  margin-left: 0 auto;
  justify-content: center;
`;

const restaurantCard = css`
  display: flex;
  position: relative;
  margin: 0 0 0.7rem 0;
  padding: 10px 0 0 1rem;
  border-bottom: 1px, solid lightgray;
  opacity: 1;
  height: 40vh;
`;

const img = css`
  margin-top: 1.5rem !important;
  border-radius: 0.2rem;
`;

const restaurantCardInfoRight = css`
  width: 54%;
  margin: 0 1rem 0 1rem;
  font-family: 'New Tegomin';
  p {
    margin: 0.3rem 0 0 1.6rem;

    padding: 0.3rem 0.5rem 0.1rem 0.5rem;
    font-weight: 600;
    font-size: 1.3rem;
  }

  h3 {
    font-size: 0.5rem;
    font-weight: 300;
  }
  h4 {
    margin-top: 0.6rem;
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.2rem;
  }

  h5,
  h6 {
    font-family: 'New Tegomin';
    text-align: center;
    font-size: 1.3rem;
    margin: 0.2rem 1rem 0.6rem 0.3rem;
    padding: 0;
    color: gray;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    margin-left: -3.5rem;
    width: 60%;
  }
`;

const titleCard = css`
  font-family: 'New Tegomin';
  text-align: center;
  margin: 1.2rem 0 0.3rem 0;
  font-weight: 700;
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 2rem;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    font-size: 3rem;
    margin-top: 2rem;
  }
`;

const caption = css`
  padding: 0 0.4rem 0 0.4rem;
  font-family: 'New Tegomin';
  font-size: 1.7rem !important;
  line-height: 1.7rem;
`;

const infoCard = css`
  height: 55vh !important;
  width: 50vw;
  background-color: beige;
  border-radius: 1.6rem;
  margin-top: 0.7rem;

  @media (min-width: 400px) and (max-width: 600px) {
    width: 90vw;
  }

  @media (min-width: 601px) and (max-width: 800px) {
    width: 90vw;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    width: 90vw;
    height: 95vh !important;
  }
`;

// to change the starIcon and price to the bottom take out the flex-column

const allInfoCard = css`
  background-color: beige;
  position: relative;
  padding: 0 0.5rem 2.2rem 0.5rem;
  border-radius: 1.6rem;

  input {
    border-radius: 2rem;
  }
`;

const space = css`
  border-top: 1px dashed lightgray;
  margin: 0.3rem;
  padding: 0;
`;

const description = css`
  margin-top: 0.3rem !important;
  @media (min-width: 400px) and (max-width: 600px) {
    margin: 0rem;
    width: 50vw !important;
  }
`;

const definingText = css`
  margin-left: 0.7rem;
  height: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 400px) and (max-width: 600px) {
    margin-left: -1.5rem;
  }
`;

const rating = css`
  text-align: center;
`;

const lineInfoCard = css`
  color: lightgray;
  width: 65%;
  margin-top: 3rem;
  margin-bottom: 1rem;
  @media (min-width: 400px) and (max-width: 600px) {
    margin-top: 0.5rem;
  }
`;

const mainChat = css`
  text-align: center;
  margin-right: 0 auto;
  margin-left: 0 auto;
  font-family: 'New Tegomin' !important;
  max-width: 46rem !important;
  margin: 0.9rem, 0.4rem 0rem 1.9rem !important;
  padding: 0.6rem;
  max-height: 30vh !important;
  overflow-y: scroll;
  border-radius: 0.6rem !important;

  @media (min-width: 801px) and (max-width: 1100px) {
    max-width: 50rem !important;
  }
`;

const link = css`
  text-decoration: none;

  @media (min-width: 400px) and (max-width: 600px) {
    margin-left: -1.5rem;
  }
`;

export default function Card(props) {
  const [userId, setUserId] = useState(props.userId);
  const [restaurantId, setRestaurantId] = useState(props.restaurantId);
  console.log('mapId page props', props.userId);
  console.log('mapId page userId state', userId);
  console.log('restaurantId mapId page', restaurantId);
  return (
    <div>
      <Head>
        <title>TopTip Map</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout username={props.username}>
        <p css={title}>TopTip Map</p>

        <main css={secondMain}>
          <div css={infoCard}>
            {' '}
            <h1 css={titleCard}>{props.restaurant[0].restaurantname}</h1>
            <div css={allInfoCard}>
              <div css={restaurantCard}>
                <div className="item">
                  <div className="polaroid">
                    {' '}
                    <Image
                      css={img}
                      className="images"
                      src={props.restaurant[0].photo}
                      alt="restaurant-place"
                      height="273px"
                      width="247px"
                    />
                    <div css={caption} className="caption">
                      {props.restaurant[0].restaurantname}
                    </div>
                  </div>
                </div>
                <div css={restaurantCardInfoRight}>
                  <h4>{props.restaurant[0].addressplace}</h4>
                  <h5>
                    <Link href={props.restaurant[0].website}>
                      <a css={link}>{props.restaurant[0].website}</a>
                    </Link>
                  </h5>

                  <hr css={space} />
                  <div css={definingText}>
                    <p css={description}>
                      {props.restaurant[0].descriptionplace}
                    </p>
                  </div>
                  <StarRating
                    restaurantId={restaurantId}
                    setRestaurantId={setRestaurantId}
                    userId={userId}
                    setUserId={setUserId}
                    css={rating}
                  />
                </div>
              </div>
              <br />
              <hr css={lineInfoCard} />
              <div css={mainChat}>
                <Comment
                  restaurantId={restaurantId}
                  setRestaurantId={setRestaurantId}
                  userId={userId}
                  setUserId={setUserId}
                  username={props.username}
                >
                  Comments
                </Comment>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getValidSessionByToken } = await import('../../util/database');
  const sessionToken = context.req.cookies.sessionToken;
  const session = await getValidSessionByToken(sessionToken);
  console.log('sessionuser?', session);
  // need to get the userId  from inside session.

  if (!session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

    return {
      redirect: {
        destination: '/login?returnTo=/map',
        permanent: false,
      },
    };
  }

  const { getRestaurant } = await import('../../util/database');
  const restaurant = await getRestaurant(context.query.mapId);
  // const username = await getUser(context.query.username);
  const restaurantId = Number(context.query.mapId);
  const userId = session.userId;
  console.log('restaurantId  gssp', restaurantId);
  console.log('userId  gssp', userId);
  console.log('usernametrue?, username');
  return {
    props: {
      restaurant,
      restaurantId,
      userId,
      // username,
    },
  };
}
