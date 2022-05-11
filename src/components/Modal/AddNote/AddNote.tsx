import { useAppDispatch } from 'redux/hooks';
import { toggle } from 'redux/slices/interaction';
import styles from './AddNote.module.scss';

function AddNote() {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(toggle('star'));
  };
  // const sendForm = (e:any) => {
  //   e.preventDefault();
  //   const form = new FormData(e.target);
  //   const user = {
  //     username: form.get('username'),
  //     password: form.get('password')
  //   };    
  // };

  return (
    <div className={styles.container}>
      <div>JAMBON</div>
      <button className={styles.close} onClick={closeModal}>X</button>
    </div>
  );
}

export default AddNote;