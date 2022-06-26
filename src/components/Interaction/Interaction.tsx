import { useState } from 'react';
import { ReactComponent as Liked } from './Interaction.ico_liked.svg';
import { ReactComponent as Starred } from './Interaction.ico_starred.svg';
import { ReactComponent as Viewed } from './Interaction.ico_viewed.svg';
import { ReactComponent as Bookmarked } from './Interaction.ico_bookmarked.svg';
import { InputStar } from 'components/Inputs/InputsLib';
import styles from './Interaction.module.scss';

type InteractionProps = {
  type: string,
  count: number,
  value: number,
  setter: (arg: number) => void,
}

/**
 * @returns 
 * @param type    liked | starred | viewed | bookmarked
 * @param count   count value
 * @param value   controlled state
 * @param setter  setter function (only for input)
 */
function Interaction({type, count, value, setter}: InteractionProps) {
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
    <>
      {typeResolver('starred') && 
        <div 
          className={`${styles.background} ${(rateMenuWrapper) ? '' : styles['hidden']}`}
          onClick={handleRateMenu}/>}
      <button className={styles.interaction}>
        {typeResolver('starred')    && <Starred/>}
        {typeResolver('liked')      && <Liked/>}
        {typeResolver('viewed')     && <Viewed/>}
        {typeResolver('bookmarked') && <Bookmarked/>}
        <span>{count}</span>
        {typeResolver('starred') &&
          <div className={`${`${styles['wrapper']} ${(rateMenuWrapper) ? '' : styles['hidden']}`}`}>
            <div className={`
              ${styles.active} ${styles['rate-menu']}
              ${rateMenu ? `${styles['is-open']}` : `${styles['is-closed']}`}
              ${animIsActive && (!rateMenu ? `${styles['is-opening']}` : `${styles['is-closing']}`)}
          `}>
              <InputStar isInput value={value ? value : 5} setter={setter}/>
            </div>
          </div>}
      </button>
    </>
  );
}

export default Interaction;