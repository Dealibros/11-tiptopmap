import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const main = css`
  padding: 0 2rem 0 2rem;
  text-align: center;
  margin-top: -2rem;
  width: 100vw;
  height: 86.4vh;
  background-image: url('../images/background-Profile/background3.jpg');
  background-color: rgba(230, 217, 217, 0.4);
  background-blend-mode: lighten;
  .shadow {
    text-shadow: 4px 4px 2px rgba(150, 150, 150, 1);
  }
  background-size: cover;
  position: relative;
  @media (min-width: 400px) and (max-width: 600px) {
    height: 88vh;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    height: 89.5vh;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    height: 89.5vh;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
  }
`;

const title = css`
  font-family: 'New Tegomin';
  color: black;
  font-weight: 700;
  font-size: 4.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 2rem !important;
  padding-top: 0.5rem;
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 2.9rem;
    padding-top: 2rem !important;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    font-size: 4.2rem;
    padding-top: 3rem !important;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    font-size: 4rem;
    padding-top: 2rem !important;
  }
`;

const mainText = css`
  opacity: 1 !important;
  margin-top: -4rem;
  width: 60vw;
  z-index: 3;
  text-shadow: #242121 0px 0px 90px;

  @media (min-width: 601px) and (max-width: 800px) {
    font-size: 2.9rem;
    padding-top: 2rem !important;
    padding-left: 1.7rem;
  }

  @media (min-width: 801px) and (max-width: 1100px) {
    text-align: center !important;
    margin: 0 auto;
  }

  h1 {
    color: white;
    color: #fff;
    text-shadow: rgb(0, 0, 0) 0.1px 0px 0px,
      rgb(0, 0, 0) 0.83487px 0.981584px 0px,
      rgb(0, 0, 0) 0.35766px 0.85511px 0px, rgb(0, 0, 0) 0.62091px 0.52441px 0px,
      rgb(0, 0, 0) 0.705713px 2.91581px 0px,
      rgb(0, 0, 0) -0.287171px 0.98622px 0px,
      rgb(0, 0, 0) -1.24844px 1.72789px 0px,
      rgb(0, 0, 0) -1.07227px 1.16926px 0px,
      rgb(0, 0, 0) -1.66798px 1.37182px 0px,
      rgb(0, 0, 0) -1.96998px 0.42336px 0px,
      rgb(0, 0, 0) -2.94502px -0.571704px 0px,
      rgb(0, 0, 0) -2.59586px -1.50383px 0px,
      rgb(0, 0, 0) -1.96093px -1.27041px 0px,
      rgb(0, 0, 0) -1.11013px -1.78704px 0px,
      rgb(0, 0, 0) -0.137119px -1.99686px 0px,
      rgb(0, 0, 0) 0.850987px -1.87677px 0px,
      rgb(0, 0, 0) 1.74541px -1.43999px 0px,
      rgb(0, 0, 0) 1.44769px -1.73459px 0px,
      rgb(0, 0, 0) 1.88051px -0.838247px 0px;
    border: 30px black;
    font-family: 'Vollkorn', serif;
    font-weight: 900;
    font-size: 3.3rem;
    line-height: 3.5rem;
    text-align: left;
    margin-left: 2rem;
    margin-bottom: 2rem;

    @media (min-width: 400px) and (max-width: 600px) {
      display: flex;
      flex-direction: column;
      font-size: 1.9rem;
      line-height: 1.7rem;
      margin-left: 0rem;
      margin-top: 0.7rem;
      margin-bottom: 1.3rem;
    }

    @media (min-width: 601px) and (max-width: 800px) {
      display: flex;
      flex-direction: column;
      font-size: 2.5rem;
      line-height: 2.3rem;
      margin-left: 5rem;
      margin-top: 0.1rem;
      margin-bottom: 1.3rem;
    }
    @media (min-width: 801px) and (max-width: 1100px) {
      font-size: 2.5rem;
      line-height: 2rem;
      margin-top: 1rem;
      margin-bottom: 1.3rem;
      position: absolute;
      padding-right: 12rem !important;
      padding-top: 2rem;
    }
    @media (min-width: 1100px) and (max-width: 1300px) {
      font-size: 3rem;
      line-height: 2.5rem;
    }

    @media (min-width: 1301px) and (max-width: 1550px) {
      font-size: 2.5rem;
      line-height: 2.2rem;
    }
  }
  margin: 1.6rem 0.5rem 0rem 4rem;
  h2 {
    color: black;
    text-shadow: rgb(0, 0, 0) 0.1px 0px 0px,
      rgb(0, 0, 0) 0.83487px 0.981584px 0px,
      rgb(0, 0, 0) 0.35766px 0.85511px 0px, rgb(0, 0, 0) 0.62091px 0.52441px 0px,
      rgb(0, 0, 0) 0.205713px 0.71581px 0px,
      rgb(0, 0, 0) -0.287171px 0.98622px 0px,
      rgb(0, 0, 0) -0.24844px 0.72789px 0px,
      rgb(0, 0, 0) -0.07227px 0.16926px 0px,
      rgb(0, 0, 0) -0.66798px 0.37182px 0px,
      rgb(0, 0, 0) -0.96998px 0.42336px 0px,
      rgb(0, 0, 0) -0.94502px -0.571704px 0px,
      rgb(0, 0, 0) -0.59586px -0.20383px 0px,
      rgb(0, 0, 0) -0.46093px -0.27041px 0px,
      rgb(0, 0, 0) -0.11013px -0.78704px 0px,
      rgb(0, 0, 0) -0.137119px -0.99686px 0px,
      rgb(0, 0, 0) 0.450987px -0.47677px 0px,
      rgb(0, 0, 0) 0.44541px -0.43999px 0px,
      rgb(0, 0, 0) 0.44769px -0.73459px 0px,
      rgb(0, 0, 0) 0.48051px -0.838247px 0px;
    font-family: 'Italiana';
    font-size: 2rem;
    line-height: 3rem;
    text-align: left;
    margin-left: 2rem;
    font-weight: 900;
    border: 30px black !important;

    @media (min-width: 400px) and (max-width: 600px) {
      display: flex;
      flex-direction: column;
      font-size: 1.3rem;
      line-height: 1.3rem;
      margin-left: 0rem;
    }
    @media (min-width: 601px) and (max-width: 800px) {
      display: flex;
      flex-direction: column;
      font-size: 1.9rem;
      line-height: 1.9rem;
      margin-left: 5rem;
      margin-top: 0.9rem;
      margin-bottom: 1.3rem;
    }
    @media (min-width: 801px) and (max-width: 1100px) {
      font-size: 1.9rem;
      line-height: 1.7rem;
      margin-top: 0.7rem;
      margin-bottom: 1.3rem;
      padding-top: 11.5rem;
    }

    @media (min-width: 1103px) and (max-width: 1300px) {
      font-size: 1.8rem;
      line-height: 1.7rem;
    }

    @media (min-width: 1301px) and (max-width: 1550px) {
      font-size: 2rem;
      line-height: 2rem;
    }
  }
`;

const positionEarth = css`
  height: 75vh;
  display: flex;
  align-content: center;
  /* width: 100vh, */

  @media (min-width: 801px) and (max-width: 1100px) {
    // position:relative;
    padding-left: 5rem;
  }
`;

type Props = {
  refreshUsername: () => void;
  username: string;
};
const World = dynamic(() => import('../components/World'), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

export default function Home(props: Props) {
  useEffect(() => {
    props.refreshUsername();
    console.log(1213);
  }, [props]);

  return (
    <div>
      <Head>
        <title>TopTip Map</title>

        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/sunshine.svg" />
      </Head>

      <Layout username={props.username}>
        <main css={main}>
          <p css={title}>TopTip Map</p>
          <div css={positionEarth}>
            <div css={mainText}>
              {' '}
              <h1>
                Save your Favourite spots
                <br />
                and help your Friends to find their own
              </h1>
              <h2>
                Use this map to showcase your favourite places, <br /> write
                reviews  of your most memorable experiences <br />
                and see where your friends have been <br />
                to inspire you where to go next.
              </h2>
            </div>
            <World />
          </div>
        </main>
      </Layout>
    </div>
  );
}
