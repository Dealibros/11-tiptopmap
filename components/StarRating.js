import { css, Global } from '@emotion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const stars = css`
  cursor: pointer;
  transition: color 200ms;
  margin-top: 0.4rem;
`;

const textRating = css`
  font-size: 1.5rem;
  margin: 0 0 0 0 !important;
  text-align: center;
`;

const input = css`
  display: none;
`;

const ratingDiv = css`
  text-align: center;
  margin-top: 0.6rem;
  margin-right: 1.5rem;
  p {
    color: darkkhaki;
  }
`;

export default function StarRating(props) {
  const [ratings, setRatings] = useState(null);
  const [hover, setHover] = useState(null);
  const [theStars, setTheStars] = useState();

  console.log('userId starcomponent', props.userId);
  console.log('restaurants starcomponent', props.restaurantId);

  useEffect(() => {
    const Stars = async () => {
      const response = await fetch(`/api/ratingsAverage`);
      console.log('restaurantId', props.restaurantId);
      const ratingResponse = await response.json();
      const ratingResponseStars = Number(ratingResponse[0].avg);
      setTheStars(3);
      console.log('rr', ratingResponseStars);
      return ratingResponseStars;
    };
    Stars();
  }, []);

  console.log('stars', theStars);
  if (!ratings) {
    return (
      <div css={ratingDiv}>
        <p css={textRating}>Your Rating?</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={star}>
              <input
                css={input}
                type="radio"
                name="starRating"
                value={ratingValue}
                onClick={() => setRatings(ratingValue)}
              />
              <FaStar
                css={stars}
                color={
                  ratingValue <= (hover || ratings) ? '#ffc107' : '#90917E'
                }
                key={star}
                size={35}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                onBlur={() => void 0}
                onClick={async () => {
                  const response = await fetch(`/api/ratings`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      ratings: ratingValue,
                      userId: props.userId,
                      restaurantId: props.restaurantId,

                      // csrfToken: props.csrfToken,
                    }),
                  });
                  await response.json();
                }}
              />
            </label>
          );
        })}
      </div>
    );
  } else {
    return (
      <div css={ratingDiv}>
        <p css={textRating}>The Total Average </p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label key={star}>
              <input
                css={input}
                type="radio"
                name="starRating"
                value={theStars}
                // onClick={() => setRatings(ratingValue)}
              />
              <FaStar
                css={stars}
                color={ratingValue <= theStars ? 'D2691E' : '#90917E'}
                key={star}
                size={35}
                onBlur={() => void 0}
              />
            </label>
          );
        })}
      </div>
    );
  }
}
