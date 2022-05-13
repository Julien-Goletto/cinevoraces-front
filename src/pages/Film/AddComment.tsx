import { Button } from 'components/Buttons/Button';
import styles from './AddComment.module.scss';

function AddComment(props: any) {

  const {pic, name, date, text} = props.data;

  return (
    <>
      <div className={styles['add-comment']}>
        <div className={styles['profil']}>
          <div className={styles['picture']}><img src={pic} alt='Avatar' className={styles['pic']} /></div>
          <div className={styles['box']}>
            <h5 className={styles['name']}>{name}</h5>
            <div className={styles['date']}>{date}</div>
          </div>
        </div>
        <div className={styles['form']}>
          <form>
            <label>
              <textarea defaultValue={text} placeholder='Ajouter un commentaire' className={styles['textarea']} />
            </label>
            <div className={styles['submit']}>
              <Button 
                styleMod='fill-rounded'
              >
                <img src='images/send-icon.svg' alt=''/>
                Poster les modifications
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddComment;