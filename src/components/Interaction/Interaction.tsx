import { useState } from 'react';
import { ReactComponent as Liked } from './Interaction.ico_liked.svg';
import { ReactComponent as Starred } from './Interaction.ico_starred.svg';
import { ReactComponent as Viewed } from './Interaction.ico_viewed.svg';
import { ReactComponent as Bookmarked } from './Interaction.ico_bookmarked.svg';
import { InputStar } from 'components/Inputs/InputsLib';
import Loader from 'components/Loader/Loader';
import styles from './Interaction.module.scss';

type InteractionProps = {
  type: string,
  count: number,
  value: number | boolean,
  handler: (arg: any) => void,
  loader: boolean
}

/**
 * @returns 
 * @param type      liked | starred | viewed | bookmarked
 * @param count     count value
 * @param value     controlled state
 * @param handler   onClick dispatch function
 * @param loader    fetch loading state
 * 
 */
function Interaction({type, count, value, handler, loader}: InteractionProps) {
  const [rateMenu, setRateMenu]               = useState<boolean>(false);
  const [rateMenuWrapper, setRateMenuWrapper] = useState<boolean>(false);
  const [animIsActive, setAnimActive]         = useState<boolean>(false);
  
  const typeResolver = (searchedString: string) => {
    if (RegExp(`\\b${searchedString}\\b`).test(type!)) {
      return true;
    } else {
      return false;
    }};
  const handleRateMenu = () => {
    setRateMenuWrapper(true);
    setAnimActive(true);
    setTimeout(() => { 
      setAnimActive(false);
      if (rateMenu) {
        setRateMenu(false);
        setRateMenuWrapper(false);
      } else {
        setRateMenu(true);
      };
    }, 490);
  };
  
  return(
    // Change appearence if user already clicked with isActive 
    <div className={value ? `${styles.interaction} ${styles['active']}` : styles.interaction}>
      {/* Background for onClick-close if Star interaction. */}
      {typeResolver('starred') && 
        <div className={(rateMenuWrapper) ? styles['background'] : styles['background--hidden']} onClick={handleRateMenu}/>}

      <button onClick={() => {
        // Select correct handler with typeResolver
        typeResolver('liked')      && handler('liked');
        typeResolver('viewed')     && handler('viewed');
        typeResolver('bookmarked') && handler('bookmarked');
        typeResolver('starred')    && handleRateMenu();
      }}>
        {/* Show Loader while waiting for PUT response */}
        {loader && <span className={styles.loader}><Loader /></span>}
        {!loader &&
          // Select correct SVG with typeResolver
          <>
            {typeResolver('liked')      && <Liked/>}
            {typeResolver('viewed')     && <Viewed/>}
            {typeResolver('bookmarked') && <Bookmarked/>}
            {typeResolver('starred')    && <Starred/>}
            <span>{count}</span>
          </>}
      </button>
      {typeResolver('starred') && 
        <div className={(rateMenuWrapper) ? styles['wrapper'] : styles['wrapper--hidden']}>
          <div className={`
            ${styles['rate-menu']}
            ${rateMenu ? `${styles['is-open']}` : `${styles['is-closed']}`}
            ${animIsActive && (!rateMenu ? `${styles['is-opening']}` : `${styles['is-closing']}`)}
          `}>
            <InputStar isInput value={(value && typeof value === 'number') ? value : 0} setter={handler}/>
          </div>
        </div>}
    </div>
  );
}

export default Interaction;