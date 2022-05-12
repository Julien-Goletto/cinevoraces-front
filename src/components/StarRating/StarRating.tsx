import { useState } from 'react';
import styles from './StarRating.module.scss';

function StarRating({ state, alt=false } : StarRating) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <>
      {[...Array(5)].map((star, index) => {
        index += 1;
        if(state === 'primary' || state === null) {
          return (
            <button 
              type='button' 
              key={index} 
              className={`
                ${styles.star} 
                ${index <= (hover || rating) ? `${styles.on}` : alt ? `${styles['off--alt']}` : `${styles.off}`}`
              }
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
            &#9733;
            </button>
          );
        }
        if(state === 'secondary' || state === null) {
          return (
            <button 
              type='button' 
              key={index} 
              className={`
                ${styles.star} 
                ${index <= (hover || rating) ? `${styles.on}` : alt ? `${styles['off--alt']}` : `${styles.off}`}`
              } 
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
            &#9733;
            </button>
          );
        }
        return null;
      })}
    </>
  );
};

export default StarRating;