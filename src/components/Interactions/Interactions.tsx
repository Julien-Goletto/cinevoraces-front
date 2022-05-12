import styles from './Interactions.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as Heart } from './ico/heart.svg';
import { ReactComponent as Star } from './ico/star.svg';
import { ReactComponent as Eye } from './ico/eye.svg';
import { ReactComponent as Bookmark } from './ico/bookmark.svg';
import { toggle } from 'redux/slices/interaction';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import StarRating from 'components/StarRating/StarRating';

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
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => {
    let entrie = Object.entries(state.interaction).find(el => el[0] === `is${type.charAt(0).toUpperCase() + type.slice(1)}`);
    if(entrie) return entrie[1];
  });
  const selectedType = () => {
    switch(type) {
    case 'like':
      return <Heart />;
    case 'star':
      return <Star />;
    case 'view':
      return <Eye />;
    case 'bookmark':
      return <Bookmark />;
    default:
      return null;
    }
  };
  const dispatchType = () => {dispatch(toggle(type));};
  const starMenuHandler = () => {
    setAnimActive(true);
    setTimeout(() => { 
      setAnimActive(false);
      (starIsOpen) ? setStarIsOpen(false) : setStarIsOpen(true);
    }, 490);
  };
  return (
    <>
      {(type !== 'star') &&
        <button onClick={dispatchType} className={
          `${styles.wrapper} ${active ? styles.active : ''}`
        }>
          {selectedType()}
          <span className={styles.count}>{count}</span>
        </button>
      }
      {(type === 'star') &&
        <>
          <button 
            onClick={starMenuHandler}
            className={`${styles.wrapper} ${active ? styles.active : ''}`}
          >
            {selectedType()}
            <span className={styles.count}>{count}</span>
            <div className={styles['wrapper-star-menu']}>
              <div className={`
                ${styles['star-menu']}
                ${starIsOpen ? `${styles['is-open']}` : `${styles['is-closed']}`}
                ${animIsActive && (!starIsOpen ? `${styles['is-opening']}` : `${styles['is-closing']}`)}
              `}>
                <StarRating state='primary' alt={true} />
              </div>
            </div>
          </button>
        </>
      }
    </>
  );
};

export default Interactions;