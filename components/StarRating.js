import { css, Global } from '@emotion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const stars = css`
  cursor: pointer;
  transition: color 200ms;
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

  console.log(props.restaurant_id);
  console.log('ratingshere', ratings);

  return (
    <div css={ratingDiv}>
      <p>Your rating is {ratings}</p>
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
              color={ratingValue <= (hover || ratings) ? '#ffc107' : '#90917E'}
              key={star}
              size={35}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onBlur={() => void 0}
              onClick={async () => {
                const response = await fetch(`/api/users/ratings`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ratings: ratingValue,
                    user_id: props.user_id,
                    restaurant_id: Number(props.restaurant_id),

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
}
