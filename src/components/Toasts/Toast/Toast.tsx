import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { removeToast } from 'redux/slices/global';
import styles from './Toast.module.scss';

type ToastProps = {
    type: string,
    text: string,
    duration?: number,
    id: number
}

function Toast({id, type, text, duration}: ToastProps) {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    setTimeout(()=> {
      dispatch(removeToast(id));
    }, duration ? duration : 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function modifier(type:string) {
    switch(type) {
    case 'error': {
      return styles['wrapper--error'];
    }
    case 'success': {
      return styles['wrapper--success'];
    }
    case 'warn': {
      return styles['wrapper--warn'];
    }
    }
  } 

  return (
    <div className={`${styles.wrapper} ${modifier(type)}`}>
      {/* <span className={styles.toast_type}>{type}: </span> */}
      <span className={styles.toast_text}>{text}</span>
    </div> 
  );
}

export default Toast;