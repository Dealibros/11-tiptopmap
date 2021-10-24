import { css } from '@emotion/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import sunshine from '../public/images/sunshine.svg';

const navContainer = css`
  margin-right: auto;
  margin-left: auto;
`;

const nav = css`
  font-family:"New Tegomin";
  margin-bottom: 0;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: #a72424 !important;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  text-decoration: none;
  padding-bottom: 0.6rem;
  padding-top: 0.6rem;
`;

const navdiv = css`
  margin-bottom: 0;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white !important;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  text-decoration: none;
  padding-bottom: 0.6rem;
  padding-top: 0.6rem;
  padding: 0.6rem 2rem 0.6rem 2rem;
`;

const navLi = css`
  font-size: 1.3rem;
  padding: 0 3rem 0 3rem !important;
  :active {
    font-size: 1rem;
    border-color: white;
    color: white;
  }
`;

// const navUl = css`
// margin: 0!important;
// padding:0!important;
// li{

// list-style: none;
// }
// `

const a = css`
  text-decoration: none;
  color: white !important;
  :hover {
    color: #a5966d;
  }
`;

const sunshineLogo = css`
  z-index: 10;
  width: 2rem;
  height: 2rem;
  padding-left: 2rem;
`;


function Header() {
  const authenticated = false;
  const Logout = ()=> null;
  return (
    <div css={navContainer}>
      <nav>

        <ul css={nav}>
          <div css={navdiv}>
            <Image css={sunshineLogo} src={sunshine} alt="logo" />
          </div>
          <div css={navdiv}>
            <li css={navLi}>
              <Link href="/">
                <a css={a}>Home</a>
              </Link>
            </li>
            <li css={navLi}>
              <Link href="/map">
                <a css={a}>Map</a>
              </Link>
            </li>
            <li css={navLi}>
              <Link href="/about-us">
                <a css={a}>About Us</a>
              </Link>
            </li>
            </div>
              <div >
                <div>
            <li css={navLi}>
              {authenticated ? (
                <>
              <Link href="/places/add">
                <a>Add a place</a>
              </Link>
              <button onClick={Logout}> Logout</button>
              </>) : (

              // <li css={navLi}>
              <Link href="/auth">
                <a css={a}>Log In / Signup</a>
              </Link>
              )}
            </li>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
