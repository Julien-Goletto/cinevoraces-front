import React from 'react';
import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';

const portal = document.getElementById('portal') as HTMLElement;

function Modal({children} : {children : React.ReactNode}) {

  return ReactDOM.createPortal(
    <div className={styles['modal-background']}>
      <div className={styles.modal}>
        { children }
      </div>
    </div>
    , portal);
};

export default Modal;