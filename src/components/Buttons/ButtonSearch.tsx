import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode
}

function ButtonSearch({children}: ButtonProps)  {

  return (
    <button className={`${styles.button_search} ${styles['button--full']}`}>{children}</button>
  );
};

export default ButtonSearch;