import React from 'react';
import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleModal, globalState } from 'redux/slices/global';

const portal = document.getElementById('portal') as HTMLElement;

function Modal({children} : {children : React.ReactNode}) {
  const {modalIsOpen} = useAppSelector(globalState);

  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    modalIsOpen && dispatch(toggleModal());
  };

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div 
        className={styles['modal-background']}
        onClick={handleCloseModal}
      />
      <div className={`${styles.modal} ${styles['scale-up-center']}`}>
        { children }
      </div>
    </div>
    , portal);
};

export default Modal;