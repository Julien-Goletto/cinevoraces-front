import styles from './Interactions.module.scss';
import { useState } from 'react';
import { ReactComponent as Heart } from './ico/heart.svg';
import { ReactComponent as Star } from './ico/star.svg';
import { ReactComponent as Eye } from './ico/eye.svg';
import { ReactComponent as Bookmark } from './ico/bookmark.svg';
import { isReviews, toggle, getRating, setRating } from 'redux/slices/interaction';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { InputStar } from 'components/Inputs/InputsLib';
import { isOnline, userLogged } from 'redux/slices/user';
import { addToast } from 'redux/slices/global';
import { useParams } from 'react-router-dom';
import { usePostInteractionMutation,usePutInteractionMutation, useRefreshTokenMutation } from 'redux/api';
import Loader from 'components/Loader/Loader';

type InteractionsProps = {
  type: string,
  count: number
}
/**
 * @param type    liked | rating | viewed | bookmarked
 * @param count   count value
 * @returns React Component with SVG & Counter + Interaction onClick for active state management
 */
function Interactions({type, count}: InteractionsProps) {
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  const [starIsOpen, setStarIsOpen] = useState<boolean>(false);
  const [animIsActive, setAnimActive] = useState<boolean>(false);
  const [wrapperIsDisplayed, setWrapperIsDisplayed] = useState<boolean>(false);
  const user = useAppSelector(userLogged);
  const reviews = useAppSelector(isReviews);
  const rating   = useAppSelector(getRating);
  const isLogged = useAppSelector(isOnline);
  const [postInteraction] = usePostInteractionMutation();
  const [putInteraction, putHandle] = usePutInteractionMutation();
  // Resolve interaction
  const actualType = useAppSelector((state) => {
    return Object.entries(state.interaction).find(el => el[0] === type); 
  });

  // return current Type
  const selectedType = () => {
    switch(type) {
    case 'liked':
      return <Heart />;                                                  
    case 'rating':
      return <Star />;
    case 'viewed':
      return <Eye />;
    case 'bookmarked':
      return <Bookmark />;
    default:
      return null;
    }
  };

  // POST -> PUT -> Dispatch
  const dispatchType = async () => {
    try {
      if (user.isOnline && type && actualType) {
        let obj = { [type] : !actualType[1] };
        if(!reviews) await postInteraction({userId: user.id, movieId: id});
        await putInteraction({userId: user.id, movieId: id, body: obj});
        dispatch(toggle(type)); 
      } else {
        throw new Error('Vous devez être connecté pour intéragir.');
      }
    } catch (error: any) {
      dispatch(addToast({type: 'warn', text: error.message}));
    }    
  };

  // Star Menu handler
  const ratingMenuHandler = () => {
    setWrapperIsDisplayed(true);
    setAnimActive(true);
    setTimeout(() => { 
      setAnimActive(false);
      if (starIsOpen) {
        setStarIsOpen(false);
        setWrapperIsDisplayed(false);
      } else {
        setStarIsOpen(true);
      };
    }, 490);
  };

  // Rating Setter handler
  const handleSetRating = async (index: number) => {
    try {
      if (isLogged) {
        !reviews && await postInteraction({userId: user.id, movieId: id});
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
      {/* IF type isn't rating */}
      {(type !== 'rating' && actualType) && 
        <div onClick={dispatchType} className={
          `${styles.wrapper} ${actualType[1] ? styles.active : ''}`
        }>
          {putHandle.isLoading ? <span className={styles.loader}><Loader /></span> : selectedType()}
          <span className={styles.count}>{count}</span>
        </div>
      }
      {/* IF type rating */}
      {(type === 'rating' && actualType) &&
        <>
          <div 
            className={`
              ${styles.background}
              ${!wrapperIsDisplayed && styles['hidden']}
            `}
            onClick={ratingMenuHandler}
          />
          <button 
            onClick={ratingMenuHandler}
            className={`${styles.wrapper} ${actualType[1] ? styles.active : ''}`}
          >
            {selectedType()}
            <span className={styles.count}>{count}</span>
            <div className={`${`
                ${styles['wrapper-star-menu']}
                ${!wrapperIsDisplayed && styles['hidden']}
            `}`}>
              <div className={`
                ${actualType[1] ? styles.active : ''}
                ${styles['star-menu']}
                ${starIsOpen ? `${styles['is-open']}` : `${styles['is-closed']}`}
                ${animIsActive && (!starIsOpen ? `${styles['is-opening']}` : `${styles['is-closing']}`)}
              `}>
                {(typeof actualType[1] === 'number') &&
                  <InputStar isInput value={actualType[1]} setter={handleSetRating}/>
                }
              </div>
            </div>
          </button>
        </>
      }
    </>
  );
};

export default Interactions;