import styles from './Comment.module.scss';
import InputStar from 'components/Inputs/InputStar';
import useSeeMore from 'hooks/useSeeMore';
import AddComment from './AddComment';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { isOnline } from 'redux/slices/user';
import { Button } from 'components/Inputs/Button';

function Comment(props: CommentProps) {
  const {edit, pic, name, date, text, rating} = props;
  const sliceText = useSeeMore(text);
  const isLogged = useAppSelector(isOnline);
  const [editable, setEditable] = useState(false);
  //Parse date
  const customDate = new Date(date);
  const createdAt = customDate.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
  const editButtonHandler = () => { setEditable(!editable); };

  // IF mode editable true
  if(edit && editable && isLogged) return <AddComment text={text} date={createdAt} editable={editable} setEditable={setEditable} />;

  return (
    <>
      <div className={styles.comment}>
        {(edit && isLogged) &&  <Button handler={editButtonHandler} styleMod='rounded-fill'>Editer</Button>}
        <div className={styles.profil}>
          {pic
            ? <div className={styles.picture}><img src={pic} alt={`Avatar de ${name}`} className={styles.pic} /></div>
            : <div className={styles.picture}><img src={'/images/user_default.svg'} alt={'Avatar par default'} className={styles.pic__default} /></div>
          }
          <div className={styles.box}>
            <h5 className={styles.name}>{name}</h5>
            <div className={styles.date}>{createdAt}</div>
          </div>
        </div>
        <div className={styles.note}><InputStar value={rating}/></div>
        {sliceText}
      </div>
    </>
  );
};

export default Comment;