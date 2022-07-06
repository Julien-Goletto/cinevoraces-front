import useSeeMore from 'hooks/useSeeMore';
import AddComment from './AddComment';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { Button, InputStar } from 'components/Inputs/InputsLib';
import styles from './Comment.module.scss';

type CommentProps = {
  pic: string,
  name: string,
  date: string,
  text: string,
  edit?: boolean,
  rating: number
}

function Comment(props: CommentProps) {
  const {edit, pic, name, date, text, rating} = props;
  const sliceText = useSeeMore(text);
  const isLogged = useAppSelector(userState);
  const [editable, setEditable] = useState(false);
  //Parse date
  const customDate = new Date(date);
  const createdAt = customDate.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
  const editButtonHandler = () => { setEditable(!editable); };

  // IF mode editable true
  if (edit && editable && isLogged) return <AddComment text={text} date={createdAt} editable={editable} setEditable={setEditable} />;

  return (
    <>
      <div className={styles.comment}>
        {(edit && isLogged) &&  <Button handler={editButtonHandler} styleMod='rounded-fill'>Editer</Button>}
        <div className={styles.profil}>
          <img src={(pic) ? pic : '/images/user_default.svg'} alt='Avatar' className={styles.pic} />
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