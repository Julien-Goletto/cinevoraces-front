import { useState } from 'react';
import { isOnline, userLogged } from 'redux/slices/user';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addToast } from 'redux/slices/global';
import { useParams } from 'react-router-dom';
import { usePostInteractionMutation, usePutInteractionMutation } from 'redux/api';
import { getRating, setRating } from 'redux/slices/interaction';
import styles from './StarRating.module.scss';

/**
 * @return          star rating menu
 * @param   alt     boolean, define star back color
 * @param   value   Integer, define value
 * @param   isInput boolean, set StarRating interactive
 */
function StarRating({ alt=false, value = 0, isInput = false } : StarRating) {
  const { id }   = useParams();
  const dispatch = useAppDispatch();
  const rating   = useAppSelector(getRating);
  const isLogged = useAppSelector(isOnline);
  const user     = useAppSelector(userLogged);
  const [hover, setHover] = useState<number>(0);
  const [postInteraction] = usePostInteractionMutation();
  const [putInteraction]  = usePutInteractionMutation();
  
  const handleSetRating = async (index: number) => {
    try {
      if (isLogged) {
        await postInteraction({userId: user.id, movieId: id});
        await putInteraction({userId: user.id, movieId: id, body: {rating: index}});
        dispatch(setRating({rating: index}));
      } else {
        throw new Error('Vous devez être connecté pour intéragir.');
      }
    } catch (error: any) {
      dispatch(addToast({type: 'warn', text: error.message}));
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