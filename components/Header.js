import { css } from '@emotion/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sunshine from '../public/images/sunshine.svg';

const navContainer = css`
  margin-right: auto;
  margin-left: auto;
`;

const nav = css`
  font-family: 'New Tegomin';
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
const navLiul = css`
  list-style-type: none;
`;
// const navUl = css`
// margin: 0!important;
// padding:0!important;
// li{

// list-style: none;
// }
// `

const a = css`
  font-size: 1.3rem;
  text-decoration: none;
  color: white !important;
  margin-left: 0.8rem;
  :hover {
    color: #a5966d;
  }
`;

const ab = css`
  font-size: 1.3rem;
  text-decoration: none;
  color: white !important;
  margin-right: 7rem;

  :hover  {
    color: #a5966d;
  }
`;

const myProfile = css`
  font-size: 1.3rem;
  margin-left: 2rem;
`;

const logout = css`
  font-size: 1.3rem;
  margin-right: 5rem;
`;
const sunshineLogo = css`
  z-index: 10;
  width: 2rem;
  height: 2rem;
  padding-left: 2rem;
`;

const notThere = css`
  display: none;
`;
function Header(props) {
  // const authenticated = false;
  // const Logout = () => null;
  return (
    <header css={navContainer}>
      <nav>
        <ul css={nav}>
          <div css={navdiv}>
            <Image css={sunshineLogo} src={sunshine} alt="logo" />
            <span>
              {props.username ? <> {props.username} </> : 'Not logged in'}
            </span>
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
                <a css={a}>Contact us</a>
              </Link>
            </li>
            {!props.username && (
              <li css={notThere}>
                <Link href={`/users-profiles/${props.username}`}>
                  <a css={myProfile}>My Profile</a>
                </Link>
              </li>
            )}
            {props.username && (
              <li>
                <Link href={`/users-profiles/${props.username}`}>
                  <a css={myProfile}>My Profile</a>
                </Link>
              </li>
            )}
          </div>
          <div>
            <div>
              <ul css={navLiul}>
                {!props.username && (
                  <>
                    <Link href="/register">
                      <a css={a}>Register/</a>
                    </Link>
                    <Link href="/login">
                      <a css={ab}>Login</a>
                    </Link>
                  </>
                )}
                {props.username && (
                  <Link href="/logout">
                    <a css={logout}>Logout</a>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
