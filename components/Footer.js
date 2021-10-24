import { css } from '@emotion/react';

// const nav = css`
// display:flex;
// justify-content:center;
// align-items:center;
// gap: 5px;
// background-color: black;
// color:white;
// flex-wrap: wrap;
// justify-content: space-between;
// list-style:none;

// `;

const footer = css`
  display: flex;
  background-color: black;
  color: white;
  padding-top: 0.6rem;
`;
const footerCopyright = css`
  font-size: 1.4rem;
  font-family: 'New Tegomin';
  /* color: rgb(58, 53, 53); */
  font-weight: 300;
  margin-bottom: 1rem;
  position: relative;
  text-align: center;
  width: 100%;
  bottom: 0;
`;

function Footer() {
  return (
    <div css={footer}>
      <div css={footerCopyright}>Andrea Mikula © 2021 Copyright</div>
    </div>
  );
}

export default Footer;
