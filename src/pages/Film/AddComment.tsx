import { Button } from 'components/Buttons/Button';
import { useAppSelector } from 'redux/hooks';
import { userLogged } from 'redux/slices/user';
import styles from './AddComment.module.scss';
import { usePostInteractionMutation, usePutInteractionMutation } from 'redux/api';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from 'redux/slices/global';
import { isReviews } from 'redux/slices/interaction';

function AddComment(props: any) {
  const { id } = useParams();
  const { setEditable, editable, text } = props;
  const reviews = useAppSelector(isReviews);
  const dispatch = useDispatch();
  const user = useAppSelector(userLogged);
  const [postInteraction] = usePostInteractionMutation();
  const [putInteraction] = usePutInteractionMutation();

  async function sendComment(e:any) {
    e.preventDefault();
    let comment = e.target.comment.value;
    try {
      if (user.isOnline) {
        !reviews && await postInteraction({userId: user.id, movieId: id});
        await putInteraction({userId: user.id, movieId: id, body: {comment: comment}});
        dispatch(addToast({type: 'success', text: 'Commentaire ajouté / modifié'}));
      } else {
        throw new Error('Une erreur est survenue, veuillez réssayé plus tard ou contact un administrateur.');
      }
    } catch (error) {
      dispatch(addToast({type: 'error', text: (error as {message:string}).message, duration: 6000}));
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
              <div className={styles['date']}>{props.date ? props.date : ''}</div>
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
                  {editable ? 'Poster votre modification' : 'Poster votre commentaire'}
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