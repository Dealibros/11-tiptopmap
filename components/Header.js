import { css } from '@emotion/react';
// import { Divide as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
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
  list-style: none;
  margin: 0;
  text-decoration: none;
  padding-bottom: 0.8rem;

  .hamburger-react {
    display: none;
    height: 52px;
    margin-right: 2.5rem;
    @media (min-width: 1024px) {
      display: fixed;
      padding-top: 10px;
      margin-left: 10px;
      z-index: 10;
    }
  }
`;

const logInorNot = css`
  text-align: left;
`;

const navdivLogo = css`
  font-family: 'New Tegomin';
  padding-top: 1rem !important;
  margin-bottom: 0;
  font-size: 1rem;
  display: flex;
  background-color: black;
  color: white !important;
  list-style: none;
  margin: 0;
  text-decoration: none;
  padding-left: 2rem;
  margin-bottom: -2rem;

  ul {
    font-family: 'New Tegomin';
    background-color: gray;
    height: 100vh;
    width: 50vw;
    margin-top: 50px;
    position: absolute;
  }
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
  padding-bottom: 0.4rem;
  padding: 0.4rem 2rem 0.6rem 2rem;

  ul {
    background-color: gray;
    height: 100vh;
    width: 100vw;
    position: absolute;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    margin: 0rem;
    align-items: left;
    padding: 0.6rem 4.8rem 0.6rem 0rem;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    margin: 0rem;
    align-items: left;
    padding: 0.8rem 4.8rem 0.8rem 0rem;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    margin: 0rem;
    align-items: left;
    padding: 1rem 4.8rem 1.3rem 0rem;
  }
`;

const registerLoginDiv = css`
  display: flex;
  text-align: right;
  justify-content: right;
  align-items: right;
`;
const navLi = css`
  font-size: 1.3rem;
  padding: 0 3rem 0 3rem !important;
  :active {
    font-size: 1rem;
    border-color: white;
    color: white;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    padding: 0.2rem !important;
  }

  @media (min-width: 601px) and (max-width: 800px) {
    padding: 0.2rem !important;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
  }
`;

const navLiul = css`
  list-style-type: none;
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 1rem !important;
    margin: 0rem;
  }
`;

const a = css`
  font-size: 1.3rem;
  text-decoration: none;
  color: white !important;
  margin-left: 0.8rem;
  cursor: pointer;
  cursor: pointer;
  :hover {
    color: #ff9900 !important;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 1rem !important;
    margin: 0rem;
  }
`;

const ab = css`
  font-size: 1.3rem;
  text-decoration: none;
  color: white !important;
  margin-right: 7rem;
  cursor: pointer;
  :hover {
    color: #ff9900 !important;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 1rem !important;
    margin-left: 0.2rem;
  }
`;

const contactUs = css`
  @media (min-width: 400px) and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    display: none;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    display: none;
  }
`;

const myProfile = css`
  font-size: 1.3rem;
  margin-left: 2rem;
  cursor: pointer;
  :hover {
    color: #ff9900;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 1rem !important;
    margin-left: 0.2rem;
  }
`;

const logout = css`
  font-size: 1.3rem;
  margin-right: 5rem;
  cursor: pointer;
  @media (min-width: 400px) and (max-width: 600px) {
    font-size: 1rem !important;
    margin-left: 0.2rem;
  }
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
  // const [showMenu, setShowMenu] = useState(false);
  // className={showMenu ? 'open' : 'closed'}

  return (
    <header css={navContainer}>
      <nav>
        <div css={navdivLogo}>
          <Image css={sunshineLogo} src={sunshine} alt="logo" />
          <span css={logInorNot}>
            {props.username ? <> {props.username} </> : 'Not logged in'}
          </span>
        </div>
        <div>
          <ul css={nav}>
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
              <li css={[navLi, contactUs]}>
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
            <div css={registerLoginDiv}>
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
            {/* <Hamburger
              className="hamburger-react"
              toggled={showMenu}
              toggle={setShowMenu}
              duration={0.2}
              easing="ease-in"
              hideOutline={false}
            /> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
