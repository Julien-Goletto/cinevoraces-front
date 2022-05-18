import { useState } from 'react';
import styles from './StarRating.module.scss';
import { isOnline } from 'redux/slices/user';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addToast } from 'redux/slices/global';

function StarRating({ alt=false, value = 0, isInput = false } : StarRating) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const isLogged = useAppSelector(isOnline);
  const dispatch = useAppDispatch();
  
  const handleSetRating = (index: number) => {
    if (isLogged) {
      setRating(index);
    } else {
      dispatch(addToast({type: 'warn', text: 'Vous devez être connecté pour intéragir.'}));
    }
  };

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
                //ICI GINO OOO !!!! FAUT CHANGER LA FONCTION ONCLICK !!!
                onClick={() => handleSetRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >&#9733;
              </button>
            );
          }
          if (!isInput) {
            return (
              <div 
                key={index} 
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