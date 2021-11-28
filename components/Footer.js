import { css } from '@emotion/react';

const footer = css`
  display: flex;
  background-color: black;
  color: white;
  padding-top: 0.6rem;
  /* margin-top: 0.5rem; */
  @media (min-width: 801px) and (max-width: 1100px) {
  }
`;
const footerCopyright = css`
  font-size: 1.4rem;
  font-family: 'New Tegomin';
  font-weight: 300;
  margin-bottom: 1rem;
  margin-top: 0;
  position: relative;
  text-align: center;
  width: 100%;
  bottom: 0;

  @media (min-width: 400px) and (max-width: 600px) {
    flex-direction: column;
    font-size: 1rem;
    padding-top: 0.2rem;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    flex-direction: column;
    font-size: 1rem;
    padding-top: 0.2rem;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

function Footer() {
  return (
    <div css={footer}>
      <div css={footerCopyright}>Andrea Mikula © 2021 Copyright</div>
    </div>
  );
}

export default Footer;
