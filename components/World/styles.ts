import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 65vw;
  height: 80vh;
  color: #fff;
  background-position: rigth;
  text-align: right;

  @media (min-width: 400px) and (max-width: 600px) {
    display: none;
  }

  @media (min-width: 601px) and (max-width: 800px) {
    display: none;
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    width: 55vw !important;
    height: 40vh !important;
    position: absolute;
    padding-top: 28rem;
    padding-left: 8rem;
  }
`;

export { Container };
