import { useAppSelector } from 'redux/hooks';
import { getToasts } from 'redux/slices/global';
import Toast from './Toast/Toast';
import styles from './Toasts.module.scss';
import ReactDOM from 'react-dom';
const portal = document.getElementById('portal') as HTMLElement;

function Toasts()  {
  let toastsList = useAppSelector(getToasts);
  
  return ReactDOM.createPortal(
    (toastsList.length > 0) && <div className={styles.toast}>
      {
        toastsList.map((toast:any)=> (
          <Toast key={toast.id} id={toast.id} type={toast.type} text={toast.text} duration={toast.duration} />
        ))
      }
    </div>
    , portal);
};

export default Toasts;