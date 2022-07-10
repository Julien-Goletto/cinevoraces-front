import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import user, { userState } from 'redux/slices/user';
import { useGetOneMovieQuery, useGetAllReviewsQuery, useGetOneReviewQuery } from 'redux/api';
import { Button, InputStar } from 'components/Inputs/InputsLib';
import useSeeMore from 'hooks/useSeeMore';
import Loader from 'components/Loader/Loader';
import styles from './FilmReviews.module.scss';

type ReviewProps = {
  avatar: string,
  username: string,
  date: string,
  comment: string,
  note: number,
  edit?: boolean
}
type FilmReviewsProps = {
  // reviews: DBReview[],
  movieId: string,
  userId: number | undefined
}

function FilmReviews({userId, movieId}: FilmReviewsProps) {
  const {data: reviewsData, isLoading} = useGetAllReviewsQuery(movieId);
  return(
    <div className={styles.comments}>
      {reviewsData &&
        <>
          <h3 className={styles.title}>Commentaires ({reviewsData.length})</h3>
          {/* Return user editable review if exist */}
          {userId && reviewsData
            .filter(({user_id}) => user_id === userId)
            .map(({avatar_url, user_pseudo, created_at, comment, rating}) => (
              <Review edit avatar={avatar_url} username={user_pseudo} date={created_at} comment={comment} note={rating}/>))}
          {/* Return other reviews if exist */}
          {reviewsData
            .filter(({user_id}) => user_id !== userId)
            .map(({avatar_url, user_pseudo, created_at, comment, rating}) => (
              <Review avatar={avatar_url} username={user_pseudo} date={created_at} comment={comment} note={rating}/>))}
        </>}
      {!reviewsData && !isLoading && 
        <p style={{textAlign: 'center', margin: '1em 0'}}>
          Aucun commentaire pour ce film
        </p>}
      {isLoading && 
        <div style={{textAlign: 'center'}}>
          <Loader />
        </div>}
    </div>
  );
};

function Review({edit, avatar, username, date, comment, note}: ReviewProps) {
  const sliceText = useSeeMore(comment);
  const [editable, setEditable] = useState(false);
  const createdAt = new Date(date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});
  const imgSrc = (avatar) ? avatar : '/images/user_default.svg'; 
  const editButtonHandler = () => {
    setEditable(!editable);
  };

  return(
    <div className={styles.comment}>
      {(edit) && <Button handler={editButtonHandler} styleMod='rounded-fill'>Editer</Button>}
      <div className={styles.profil}>
        <img src={imgSrc} alt='Avatar' className={styles.pic}/>
        <div className={styles.box}>
          <h5 className={styles.name}>{username}</h5>
          <div className={styles.date}>{createdAt}</div>
        </div>
      </div>
      <div className={styles.note}><InputStar value={note}/></div>
      {sliceText}
    </div>
  );
}

export default FilmReviews;