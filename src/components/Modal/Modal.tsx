import React from 'react';
import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleConnection } from 'redux/slices/global';

const portal = document.getElementById('portal') as HTMLElement;

function Modal({children} : {children : React.ReactNode}) {
  const connectionIsOpen = useAppSelector(state => state.global.connectionIsOpen);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    connectionIsOpen && dispatch(toggleConnection());
  };

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div 
        className={styles['modal-background']}
        onClick={handleCloseModal}
      />
      <div className={styles.modal}>
        { children }
      </div>
    </div>
    , portal);
};

export default Modal;