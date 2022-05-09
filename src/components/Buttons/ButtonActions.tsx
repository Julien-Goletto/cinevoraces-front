import { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  state: string
  children: React.ReactNode
  action?: MouseEventHandler; 
}

function ButtonActions({children, state, action}: ButtonProps)  {

  if(state === 'full' || state === null) {
    return <button onClick={action} className={`${styles['button-action']} ${styles['button--full']}`}>{children}</button>;
  }
  if(state === 'white') {
    return <button onClick={action} className={`${styles['button-action']} ${styles['button--white']}`}>{children}</button>;
  }
  return null;
  
};

export default ButtonActions;