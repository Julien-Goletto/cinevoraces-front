import styles from './Interactions.module.scss';
import { useRef, useState } from 'react';
import { ReactComponent as Heart } from './ico/heart.svg';
import { ReactComponent as Star } from './ico/star.svg';
import { ReactComponent as Eye } from './ico/eye.svg';
import { ReactComponent as Bookmark } from './ico/bookmark.svg';
import interaction, { toggle } from 'redux/slices/interaction';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import StarRating from 'components/StarRating/StarRating';
import { isOnline, userLogged } from 'redux/slices/user';
import { addToast } from 'redux/slices/global';
import { useParams } from 'react-router-dom';
import { usePostInteractionMutation, usePostMovieMutation, usePutInteractionMutation, useRefreshTokenMutation } from 'redux/api';

type InteractionsProps = {
  type: string,
  count: number
}

/**
 * 
 * @param {string} type Can be (like - star - view - bookmark)
 * @param {number} count Counter value
 * @returns React Component with SVG & Counter + Interaction onClick for active state management
 */
function Interactions({type, count}: InteractionsProps) {
  const [starIsOpen, setStarIsOpen] = useState(false);
  const [animIsActive, setAnimActive] = useState(false);
  const [wrapperIsDisplayed, setWrapperIsDisplayed] = useState(false);
  const isLogged = useAppSelector(isOnline);
  const user = useAppSelector(userLogged);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [refreshToken, tokenHandle] = useRefreshTokenMutation();
  const [postInteraction, postHandle] = usePostInteractionMutation();
  const [putInteraction, putHandle] = usePutInteractionMutation();
  const active = useAppSelector((state) => {
    let entrie = Object.entries(state.interaction).find(el => el[0] === `${type}`);
    if(entrie) return entrie[1];
  });
  const actualType = useAppSelector((state) => {
    return Object.entries(state.interaction).find(el => el[0] === type); 
  });

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
  const dispatchType = async () => {
    try {
      if (isLogged && type && actualType) {
        let obj = {
          [type] : !actualType[1]
        };
        await refreshToken();
        await postInteraction({userId: user.id, movieId: id});
        await putInteraction({userId: user.id, movieId: id, body: obj});
      }
    } catch (error) {
      dispatch(addToast({type: 'error', text: 'Vous devez être connecté pour intéragir.'}));
      return;
    }
  
    dispatch(toggle(type)); 
  };
  const starMenuHandler = () => {
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
  return (
    <>
      {(type !== 'rating') &&
        <div onClick={dispatchType} className={
          `${styles.wrapper} ${active ? styles.active : ''}`
        }>
          {selectedType()}
          <span className={styles.count}>{count}</span>
        </div>
      }
      {(type === 'rating') &&
        <>
          <div 
            className={`
              ${styles.background}
              ${!wrapperIsDisplayed && styles['hidden']}
            `}
            onClick={starMenuHandler}
          />
          <button 
            onClick={starMenuHandler}
            className={`${styles.wrapper} ${active ? styles.active : ''}`}
          >
            {selectedType()}
            <span className={styles.count}>{count}</span>
            <div className={`${`
                ${styles['wrapper-star-menu']}
                ${!wrapperIsDisplayed && styles['hidden']}
            `}`}>
              <div className={`
                ${styles['star-menu']}
                ${starIsOpen ? `${styles['is-open']}` : `${styles['is-closed']}`}
                ${animIsActive && (!starIsOpen ? `${styles['is-opening']}` : `${styles['is-closing']}`)}
              `}>
                <StarRating alt={true} isInput={true}/>
              </div>
            </div>
          </button>
        </>
      }
    </>
  );
};

export default Interactions;