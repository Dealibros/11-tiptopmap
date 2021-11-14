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

export default function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div css={ratingDiv}>
      <p>Your rating is {rating}</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={star}>
            <input
              css={input}
              type="radio"
              name="starRating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              css={stars}
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#90917E'}
              key={star}
              size={35}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onBlur={() => void 0}
            />
          </label>
        );
      })}
    </div>
  );
}
