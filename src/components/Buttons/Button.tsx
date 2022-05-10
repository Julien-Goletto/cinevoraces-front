import styles from './Button.module.scss';

function Button({children, state, action, href}: Button)  {
  if(state === 'full' || state === null) {
    return <a onClick={action} href={href} className={`${styles.button} ${styles['button--full']}`}>{children}</a>;
  }
  if(state === 'empty') {
    return <a onClick={action} href={href} className={`${styles.button} ${styles['button--empty']}`}>{children}</a>;
  } 
  return null;
};

export default Button;