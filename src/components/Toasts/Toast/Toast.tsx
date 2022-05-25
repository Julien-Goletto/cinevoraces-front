import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { removeToast } from 'redux/slices/global';
import styles from './Toast.module.scss';

function Toast({id, type, text, duration}: ToastProps) {
  const dispatch = useAppDispatch();
  const [fadeout, setFadeout] = useState<any>(null);

  useEffect(()=> {

    setTimeout(()=> {
      setFadeout(styles['blur-out']);
    }, 2900);

    setTimeout(()=> {
      dispatch(removeToast(id));
    }, duration ? duration : 3000);
  }, [duration, id, dispatch]);

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
    <div className={`${styles.wrapper} ${fadeout} ${modifier(type)}`}>
      <span className={styles.toast_text}>{text}</span>
    </div> 
  );
}

export default Toast;