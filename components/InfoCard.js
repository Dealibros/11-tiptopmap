import { css } from '@emotion/react';
import Image from 'next/image';

const searchResult = css`
  display: flex;
  position: relative;
  margin: 6px 0 0 0;
  padding: 10px 0 0 0;
  border-bottom: 1px, solid lightgray;
  opacity: 1;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  img {
    display: inline;
    margin: 0 auto;
    margin-left: -25%; //centers the image
    height: 100%;
    width: auto;

    overflow: hidden;
    border-radius: 0.3rem;
  }
`;

const divforImg = css`
  position: relative;
  height: 165px;
  width: 200px;
  margin-top: auto;
  margin-bottom: auto;

  @media (min-width: 400px) and (max-width: 600px) {
    display: none;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    height: 265px;
    width: 183px;
  }
`;

const searchResultInfo = css`
  width: 23vw;
  margin-left: 0.5rem;

  @media (min-width: 400px) and (max-width: 600px) {
    width: 27vw;
    margin-left: 0.7rem;
  }
`;

const searchResultInfoTop = css`
  p {
    margin: 0 0 0 0.9rem;
    padding-bottom: 0.1rem;
    padding-top: 0;
    font-weight: 300;
    font-size: 13.9px;
    color: gray;
  }
  h3 {
    font-size: 1.3rem;
    margin: 0 0 0 0.9rem;
    font-weight: 300;
  }
  h5,
  h6 {
    font-size: 0.7rem;
    margin: 0 0 0 0.9rem;
    padding: 0;
  }
  @media (min-width: 400px) and (max-width: 600px) {
    margin-left: -2rem;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    margin-left: -0.4rem;
  }

  @media (min-width: 400px) and (max-width: 600px) {
    h3 {
      font-size: 1.1rem;
    }
    h5 {
      display: none;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const searchResultInfoBottom = css`
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  p {
    margin: 0 0 0 0;
    font-size: 0.8rem;
  }
  h3 {
    margin: 0 0 0 0.7rem;
    font-size: 0.6rem;
    span {
      margin: 0 0 0 0;
      font-size: 0.6rem;
    }
  }

  @media (min-width: 400px) and (max-width: 600px) {
    margin-bottom: -0.6rem;
  }
`;

const space = css`
  border-top: 1px dashed lightgray;
  margin: 0.3rem;
  padding: 0;
`;
const link = css`
  text-decoration: none;
`;
const searchResultStars = css`
  font-size: 0.8rem;
  @media (min-width: 400px) and (max-width: 600px) {
    display: none;
  }
`;
const searchResultPrice = css`
  font-size: 0.8rem;
  text-align: right;
  @media (min-width: 400px) and (max-width: 600px) {
    display: none;
  }
`;

const description = css`
  color: gray;
`;

const rating = css`
  font-size: 1.6rem;
  font-weight: 600;
`;

const price = css`
  font-size: 0.9rem !important;
  font-weight: 600;
`;

const lineInfoCard = css`
  margin-bottom: 0;
`;

export default function InfoCard(props) {
  // destructuring from URL and  combine start and end Date
  // for displaying dynamic  info from search bar and  format the data
  // const { restaurant } = router.query;
  function findTheType() {
    if (props.restaurants.types.search('restaurant') === true) {
      console.log('forks and knifes');
    } else if (props.restaurants.types.search('museum') === true) {
      console.log('is a museum');
    } else if (
      props.restaurants.types.search('park') === true ||
      props.restaurants.types.search('natural_feature') === true
    ) {
      console.log('its a park');
    } else if (props.restaurants.types.search('bar') === true) {
      console.log('Its a Bar');
    } else if (props.restaurants.types.search('cafe') === true) {
      console.log('Its a cooffee place');
    } else if (props.restaurants.types.search('tourist_attraction') === true) {
      console.log('Its for tourists');
    } else {
      console.log('something else');
    }
  }
  findTheType();
  return (
    <div>
      <div css={searchResult}>
        <div css={divforImg}>
          <Image
            src={props.restaurants.photo}
            alt="restaurant-place"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div css={searchResultInfo}>
          <div css={searchResultInfoTop}>
            <h3>
              {props.restaurants.restaurantname},{findTheType()}
            </h3>
            <p>{props.restaurants.addressplace}</p>
            <h5 css={link}>{props.restaurants.website}</h5>
            <hr css={space} />
            <p css={description}>{props.restaurants.descriptionplace}</p>{' '}
          </div>
          <div css={searchResultInfoBottom}>
            <h3 css={searchResultStars}>
              <span role="img" aria-label="Star">
                ⭐
              </span>
              <p css={rating}>
                <strong>{props.restaurants.rating}</strong>
              </p>
            </h3>
            <h3 css={searchResultPrice}>
              <p css={price}>
                <br />
                {props.restaurants.price}
              </p>
            </h3>
          </div>
        </div>
      </div>
      <hr css={lineInfoCard} />
    </div>
  );
}
