import styles from './Button.module.scss';

function Button({children, state, action}: Button)  {
  if(state === 'full' || state === null) {
    return <button onClick={action} className={`${styles.button} ${styles['button--full']}`}>{children}</button>;
  }
  if(state === 'empty') {
    return <button onClick={action} className={`${styles.button} ${styles['button--empty']}`}>{children}</button>;
  } 
  return null;
};

export default Button;