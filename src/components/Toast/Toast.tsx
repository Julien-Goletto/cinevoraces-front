import styles from './Toast.module.scss';

function Toast()  {
  return (
    <div className={styles.toast}>
      <span className={styles.toast_type}>Error</span>
      <span className={styles.toast_text}>C'est cassé</span>
    </div>
  );
};

export default Toast;