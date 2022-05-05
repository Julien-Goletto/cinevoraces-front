import styles from './Interactions.module.scss';
import { ReactComponent as Heart } from './ico/heart.svg';
import { ReactComponent as Star } from './ico/star.svg';
import { ReactComponent as Eye } from './ico/eye.svg';
import { ReactComponent as Bookmark } from './ico/bookmark.svg';
import { toggle } from 'redux/slices/interaction';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

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
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => {
    let entrie = Object.entries(state.interaction).find(el => el[0] === `is${type.charAt(0).toUpperCase() + type.slice(1)}`);
    if(entrie) return entrie[1];
  });
  

  function selectedType() {
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
  }

  return (
    <button onClick={() => dispatch(toggle(type))} className={
      `${styles.wrapper} ${active ? styles.active : ''}`
    }>
      {selectedType()}
      <span className={styles.count}>{count}</span>
    </button>
  );
};

export default Interactions;