import styles from './Button.module.scss';

type ButtonProps = {
  state: string
  children: React.ReactNode
}

function ButtonActions({children, state}: ButtonProps)  {

  if(state === 'full' || state === null) {
    return <button className={`${styles['button-action']} ${styles['button--full']}`}>{children}</button>;
  }
  if(state === 'white') {
    return <button className={`${styles['button-action']} ${styles['button--white']}`}>{children}</button>;
  }
  return null;
  
};

export default ButtonActions;