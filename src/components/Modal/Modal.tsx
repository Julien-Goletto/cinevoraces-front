import ReactDOM from 'react-dom';
import { useAppDispatch } from 'redux/hooks';
import { toggleModal } from 'redux/slices/global';
import styles from './Modal.module.scss';

type ModalProps = {
  children : React.ReactNode
}

// Append modal outside of App with a portal
const portal = document.getElementById('portal') as HTMLElement;

/**
 * @returns empty modal
 */
function Modal({children} : ModalProps) {
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    dispatch(toggleModal());
  };

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles['modal-background']} onClick={handleCloseModal}/>
      <div className={`${styles.modal} ${styles['scale-up-center']}`}>
        { children }
      </div>
    </div>
    , portal);
};

export default Modal;