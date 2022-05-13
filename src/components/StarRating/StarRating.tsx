import { useState } from 'react';
import styles from './StarRating.module.scss';

function StarRating({ alt=false, value = 0, isInput = false } : StarRating) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <>
      <div className={styles['container']}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          if (isInput) {
            return (
              <button 
                type='button' key={index} 
                className={`
                  ${styles.star} 
                  ${index <= (hover || rating) ? `${styles.on}` : alt ? `${styles['off--alt']}` : `${styles.off}`}`
                }
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >&#9733;
              </button>
            );
          }
          if (!isInput) {
            return (
              <div 
                className={`
                  ${styles.star}
                  ${index <= (value) ? `${styles.on}` : alt ? `${styles['off--alt']}` : `${styles.off}`}
                `}
              >&#9733;
              </div>
            );
          }
          return null;
        })}
      </div>
    </>

  );
};

export default StarRating;