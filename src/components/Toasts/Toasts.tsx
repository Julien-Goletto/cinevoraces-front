import ReactDOM from 'react-dom';
import { useAppSelector } from 'redux/hooks';
import { globalState } from 'redux/slices/global';
import Toast from './Toast/Toast';
import styles from './Toasts.module.scss';

// Append toats outside of App with a portal
const portal = document.getElementById('portal') as HTMLElement;

function Toasts()  {
  const { toasts } = useAppSelector(globalState);
  
  return ReactDOM.createPortal(
    (toasts.length > 0) && 
      <div className={`${styles.toast} ${styles['scale-up-left']}`}>
        {toasts.map(({id, type, text, duration}: Toast) => (
          <Toast 
            key={id} 
            id={id!} 
            type={type} 
            text={text} 
            duration={duration}
          />))}
      </div>
    , portal);
};

export default Toasts;