import styles from './Comment.module.scss';
import StarRating from 'components/StarRating/StarRating';
import useSeeMore from 'hooks/useSeeMore';
import AddComment from './AddComment';
import { useState } from 'react';

function Comment(props: CommentProps) {
  const { pic, name, date, text, rating } = props;
  const edit = false;
  const sliceText = useSeeMore(text);
  const isLogged = true;
  const [editable, setEditable] = useState(false);

  //Parse date
  const customDate = new Date(date);
  const createdAt = customDate.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});

  
  
  if(edit && editable && isLogged) return <AddComment data={props} />;

  return (
    <>
      <div className={styles.comment}>
        {(edit && isLogged) && <button onClick={()=> {setEditable(!editable);}}>EDIT</button>}
        <div className={styles.profil}>
          {pic
            ? <div className={styles.picture}><img src={pic} alt={`Avatar de ${name}`} className={styles.pic} /></div>
            : <div className={styles.picture}><img src={'/images/user_default.svg'} alt={`Avatar par default`} className={styles.pic__default} /></div>
          }
          <div className={styles.box}>
            <h5 className={styles.name}>{name}</h5>
            <div className={styles.date}>{createdAt}</div>
          </div>
        </div>
        <div className={styles.note}><StarRating value={rating} /></div>
        {sliceText}
      </div>
    </>
  );
};

export default Comment;