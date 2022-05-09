import styles from './Button.module.scss';

type ButtonProps = {
  state: string
  children: React.ReactNode
}

function Button({children, state}: ButtonProps)  {

  if(state === 'full' || state === null) {
    return <button className={`${styles.button} ${styles['button--full']}`}>{children}</button>;
  }
  if(state === 'empty') {
    return <button className={`${styles.button} ${styles['button--empty']}`}>{children}</button>;
  } 
  return null;
  
};

export default Button;