import styles from './Button.module.scss';

function ButtonActions({children, state, action, href}: Button)  {
  if(state === 'full' || state === null) {

    if(href) {
      return (
        <a href={href}>
          <button onClick={action} className={`${styles['button-action']} ${styles['button--full']}`}>{children}</button>
        </a>
      );
    }
    return <button onClick={action} className={`${styles['button-action']} ${styles['button--full']}`}>{children}</button>;
  }
  if(state === 'white') {
    if(href) {
      return (
        <a href={href}>
          <button onClick={action} className={`${styles['button-action']} ${styles['button--white']}`}>{children}</button>
        </a>
      );
    }
    return <button onClick={action} className={`${styles['button-action']} ${styles['button--white']}`}>{children}</button>;
    
  }
  return null;
};

export default ButtonActions;