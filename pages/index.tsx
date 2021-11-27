import { css } from '@emotion/react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const main = css`
  padding: 0 2rem 0 2rem;
  text-align: center;
  margin-top: -1.9rem;
  width: 100vw;
  height: 84vh;
  /* background-image: url('../images/backgroundProfile/8.jpg'); */
background-image: linear-gradient(
-20deg, rgb(233, 222, 250) 0%, rgb(251, 252, 219) 100%);
  /* background-image: linear-gradient(top, #9AB0B3 0%, #92BD9E 50%, #ACC889 100%);
    background: -webkit-linear-gradient(top, #9AB0B3 0%, #92BD9E 50%, #dce6d0 100%);
    background: linear-gradient(to bottom, #9AB0B3 0%, #92BD9E 50%, #ACC889 100%); */

  background-size: cover;
  position: relative;

`;

const title = css`
  font-family: 'New Tegomin';
  color: black;
  font-weight: 700;
  font-size: 4rem;
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 2rem!important;

`;

const mainText = css`
  margin-top:-4rem;
  width:60vw;
  h1 {

  color: white;
  border: 1rem solid;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  text-shadow:
        first layer at 1px -1px -1px 0px #000,
    0px -1px 0px #000, 1px -1px 0px #000, -1px 0px 0px #000, 1px 0px 0px #000,
    -1px 1px 0px #000, 0px 1px 0px #000, 1px 1px 0px #000,
    /* second layer at 2px */ -2px -2px 0px #000, -1px -2px 0px #000,
    0px -2px 0px #000, 1px -2px 0px #000, 2px -2px 0px #000, 2px -1px 0px #000,
    2px 0px 0px #000, 2px 1px 0px #000, 2px 2px 0px #000, 1px 2px 0px #000,
    0px 2px 0px #000, -1px 2px 0px #000, -2px 2px 0px #000, -2px 1px 0px #000,
    -2px 0px 0px #000, -2px -1px 0px #000;

  border: 10px black;
 font-family: 'Vollkorn', serif;
  font-weight: 900;
  font-size: 3.3rem;
  line-height:3.5rem;
  text-align:left;
  margin-left:2rem;
  margin-bottom: 2rem;

  }
  margin: 1.6rem 0.5rem 0rem 4rem;
  h2 {

  color: #352d2d;
  font-family: 'Italiana';
  font-size: 1.9rem;
  line-height:3rem;
  text-align:left;
  margin-left:2rem
}
`;

const positionEarth = css `
height:75vh;
display: flex;
align-content: center;
width: 100vh,
`;


type Props = {
  refreshUsername: () => void;
  username: string;
  csrfToken: string;
};
 const World = dynamic(() => import('../components/World'),{
 ssr: false,
 loading:() => <p>loading...</p>
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
          <p css={mainText}>
            {' '}
            <h1>Save your Favourite spots<br/>and help your Friends to find their own</h1>

           <h2>Use this map to showcase your favourite places, <br /> write reviews  of
            your most memorable experiences  <br />and see where your friends have been <br />
            to help guide decisions on where to go next.
            </h2>
          </p>
           <World/>
           </div>

        </main>
      </Layout>
    </div>
  );
}