import { Button } from 'components/Buttons/Button';
import styles from './AddComment.module.scss';

const fake_data: {[key:string]: string} =
  { 
    pic: 'fake_data/pictures/profilpic.png',
  };

function AddComment() {
  return (
    <>
      <h3 className={styles['title']}>Commentaires (18)</h3>
      <div className={styles['add-comment']}>
        <div className={styles['profil']}>
          <div className={styles['picture']}><img src={fake_data.pic} alt='Avatar' className={styles['pic']} /></div>
          <div className={styles['box']}>
            <h5 className={styles['name']}>Wade Warren</h5>
            <div className={styles['date']}>Le 7 février 2022</div>
          </div>
        </div>
        <div className={styles['form']}>
          <form>
            <label>
              <textarea placeholder='Ajouter un commentaire' className={styles['textarea']} />
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