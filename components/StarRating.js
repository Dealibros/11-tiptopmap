import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const stars = css`
  cursor: pointer;
  transition: color 200ms;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem !important;
`;

const textRating = css`
  font-size: 1.5rem;
  margin: 0 0 0 0 !important;
  text-align: center;
`;

const input = css`
  display: none;
`;

const centerStarsDiv = css`
  display: flex;
  @media (min-width: 400px) and (max-width: 600px) {
    display: none;
  }
`;

const ratingDiv = css`
  text-align: center;
  border: solid 0.2rem lightgray;
  border-radius: 0.3rem;
  width: 16rem;
  background-color: white;
  position: relative;
  margin: 0 auto;
  /* box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24); */
  p {
    color: darkkhaki;
  }
`;

export default function StarRating(props) {
  const [ratings, setRatings] = useState(Number(null));
  const [hover, setHover] = useState(null);
  const [theStars, setTheStars] = useState();

  console.log('userId starcomponent', props.userId);
  console.log('restaurants starcomponent', props.restaurantId);

  useEffect(() => {
    const Stars = async () => {
      const response = await fetch(
        `/api/ratingsAverageMain/${props.restaurantId}`,
      );
      console.log('restaurantId', props.restaurantId);
      const ratingResponse = await response.json();

      const ratingResponseStars = Number(ratingResponse[0].avg);
      setTheStars(ratingResponseStars);
      return ratingResponseStars;
    };
    Stars();
  });

  if (!ratings) {
    return (
      <div css={centerStarsDiv}>
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
                {console.log('starRatingValueaa', ratingValue)}

                <FaStar
                  css={stars}
                  color={
                    ratingValue <= (hover || ratings) ? '#ffc107' : '#90917E'
                  }
                  key={star}
                  size={41}
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
                      }),
                    });
                    await response.json();
                  }}
                />
              </label>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div css={ratingDiv}>
        <p css={textRating}>The Total Average </p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          console.log(i);
          return (
            <label key={star}>
              <input
                css={input}
                type="radio"
                name="starRating"
                value={theStars}
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
