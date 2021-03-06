import Content from './Content';
import styles from './Film.module.scss';
import Comment from './Comment';
import { useOneMovieQuery, useMovieReviewsQuery, useGetUserReviewQuery } from 'redux/api';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userLogged } from 'redux/slices/user';
import { useCallback, useEffect, useState } from 'react';
import { setActive, setInactive } from 'redux/slices/interaction';
import AddComment from './AddComment';


function Film() {
  const { id }  = useParams();
  const user = useAppSelector(userLogged);
  const dispatch = useAppDispatch();
  const { data: movie, isLoading: isMovieLoad } = useOneMovieQuery(Number(id));
  const { data: reviews, isLoading: isReviewsLoad } = useMovieReviewsQuery(Number(id));
  const { data: userReview, isLoading: isUserReviewLoad, isError: isUserReviewError, isSuccess: isUserReviewSuccess  } = useGetUserReviewQuery({userId: user.id, movieId: id });
  const [filteredComment, setFilteredComment] = useState(reviews);

  const filterComment = useCallback(
    (userId: number | null, comments:any) => {
      if(!comments) return false;
      let userComment = comments.find((comment:any) => comment.user_id === userId);
      if(!user.isOnline || !userComment) return comments;
      let filterComment = comments.filter((comment:any) => comment.user_id !== userId);
      return [{...userComment, edit: true}, ...filterComment];},
    [user]
  );

  useEffect(()=> {
    // RESET all interaction
    dispatch(setInactive());
    // IF user as comment, put edit:true on him and push on top of the list
    setFilteredComment(filterComment(user.id, reviews));
    // SET reviews from db (if no error/no data)
    if(typeof userReview !== 'string' && !isUserReviewLoad && !isUserReviewError) {
      dispatch(setActive(userReview));
    }    
  },[user,
    userReview,
    dispatch,
    isUserReviewLoad,
    isUserReviewError,
    reviews,
    filterComment]);
  

  return (
    movie ?
      <section className={styles.film}>
        <Content 
          movie={movie} 
          isLoading={isMovieLoad}
        />
        <h3 className={styles['title']}>Commentaires ({reviews ? reviews.length : '~'})</h3>
        <div className={styles.comments}>
          {
            (isUserReviewSuccess && !userReview[0].comment) && <AddComment props={{text: userReview[0].comment, pic:'', date: userReview[0].updated_at}} />
          }
          {
            (!isReviewsLoad && filteredComment) && filteredComment.map((review: any, index:any) => (
              <Comment key={index} edit={review.edit} pic={review.avatar_url} name={review.user_pseudo} date={review.created_at} text={review.comment} rating={review.rating} />
            ))
          }
          {
            (!reviews) && <p style={{textAlign: 'center', margin: '1em 0'}}>Aucun commentaire pour ce film</p>
          }
          {
            (isReviewsLoad) &&
              <div style={{textAlign: 'center'}}><Loader /></div>
          }
        </div>
      </section>
      : <Loader />
  );
};

export default Film;