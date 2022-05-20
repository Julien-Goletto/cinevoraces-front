import { Button } from 'components/Buttons/Button';
import { useAppSelector } from 'redux/hooks';
import { userLogged } from 'redux/slices/user';
import styles from './AddComment.module.scss';
import { usePostInteractionMutation, usePutInteractionMutation, useRefreshTokenMutation } from 'redux/api';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from 'redux/slices/global';

function AddComment(props: any) {
  const { id } = useParams();
  const { setEditable } = props;
  const { date, text } = props.props;
  const dispatch = useDispatch();
  const user = useAppSelector(userLogged);
  const [refreshToken, tokenHandle] = useRefreshTokenMutation();
  const [postInteraction, postHandle] = usePostInteractionMutation();
  const [putInteraction, putHandle] = usePutInteractionMutation();

  async function sendComment(e:any) {
    e.preventDefault();
    let comment = e.target.comment.value;
    try {
      if (user.isOnline) {
        await refreshToken();
        await postInteraction({userId: user.id, movieId: id});
        await putInteraction({userId: user.id, movieId: id, body: {comment: comment}});
        
      }
    } catch (error) {
      dispatch(addToast({type: 'error', text: 'Une erreur est survenue, veuillez réssayé plus tard ou contact un administrateur.', duration: 6000}));
      return;
    }
    setEditable(false);
  }
  
  return (
    props ?
      <>
        <div className={styles['add-comment']}>
          <div className={styles['profil']}>
            <div className={styles['picture']}><img src={'/images/user_default.svg'} alt='Avatar' className={styles['pic']} /></div>
            <div className={styles['box']}>
              <h5 className={styles['name']}>{user.pseudo}</h5>
              <div className={styles['date']}>{date}</div>
            </div>
          </div>
          <div className={styles['form']}>
            <form onSubmit={sendComment}>
              <label>
                <textarea name='comment' defaultValue={text} placeholder='Ajouter un commentaire' className={styles['textarea']} />
              </label>
              <div className={styles['submit']}>
                <Button 
                  styleMod='fill-rounded'
                >
                  <img src='/images/send-icon.svg' alt=''/>
                  Poster votre commentaire / modification
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
      : null
  );
};

export default AddComment;