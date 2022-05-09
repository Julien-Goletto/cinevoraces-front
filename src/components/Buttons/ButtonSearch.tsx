import styles from './Button.module.scss';

function ButtonSearch({children}: ButtonSearch)  {
  return (
    <button className={`${styles['button-search']} ${styles['button--full']}`}>{children}</button>
  );
};

export default ButtonSearch;