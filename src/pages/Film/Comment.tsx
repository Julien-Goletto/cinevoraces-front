import styles from './Comment.module.scss';
import StarRating from 'components/StarRating/StarRating';
import useSeeMore from 'hooks/useSeeMore';
import AddComment from './AddComment';
import { useState } from 'react';

function Comment(props: CommentProps) {
  const {pic, name, date, text, edit} = props;
  const sliceText = useSeeMore(text);
  const isLogged = true;
  const [editable, setEditable] = useState(false);
  
  if(edit && editable && isLogged) return <AddComment data={props} />;

  return (
    <>
      <div className={styles.comment}>
        {(edit && isLogged) && <button onClick={()=> {setEditable(!editable);}}>EDIT</button>}
        <div className={styles.profil}>
          <div className={styles.picture}><img src={pic} alt='Avatar' className={styles.pic} /></div>
          <div className={styles.box}>
            <h5 className={styles.name}>{name}</h5>
            <div className={styles.date}>{date}</div>
          </div>
        </div>
        <div className={styles.note}><StarRating state='secondary'/></div>
        {sliceText}
      </div>
    </>
  );
};

export default Comment;