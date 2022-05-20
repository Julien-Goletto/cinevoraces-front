import { useEffect, useState } from 'react';
import styles from './StarRating.module.scss';
import { isOnline, userLogged } from 'redux/slices/user';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addToast } from 'redux/slices/global';
import { useParams } from 'react-router-dom';
import { usePostInteractionMutation, usePutInteractionMutation, useRefreshTokenMutation } from 'redux/api';
import { getRating, setRating } from 'redux/slices/interaction';

function StarRating({ alt=false, value = 0, isInput = false } : StarRating) {
  const rating = useAppSelector(getRating);
  const [hover, setHover] = useState(0);
  const isLogged = useAppSelector(isOnline);
  const [refreshToken, tokenHandle] = useRefreshTokenMutation();
  const [postInteraction, postHandle] = usePostInteractionMutation();
  const [putInteraction, putHandle] = usePutInteractionMutation();
  const user = useAppSelector(userLogged);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  
  const handleSetRating = async (index: number) => {
    if (isLogged) {
      try {
        if (isLogged) {
          await refreshToken();
          await postInteraction({userId: user.id, movieId: id});
          await putInteraction({userId: user.id, movieId: id, body: {rating: index}});
        }
      } catch (error) {
        dispatch(addToast({type: 'error', text: 'Vous devez être connecté pour intéragir.'}));
        return;
      }
      dispatch(setRating({rating: index}));
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
                  ${index <= (hover || value) ? `${styles.on}` : alt ? `${styles['off--alt']}` : `${styles.off}`}`
                }
                onClick={() => handleSetRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(typeof rating === 'boolean' ? 0 : rating)}
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