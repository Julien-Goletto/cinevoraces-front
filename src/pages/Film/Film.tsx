import Content from './Content';
import styles from './Film.module.scss';
import Comment from './Comment';
import { useGetOneMovieQuery, useGetAllReviewsQuery, useGetOneReviewQuery } from 'redux/api';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { useCallback, useEffect, useState } from 'react';
import { setActive, setInactive } from 'redux/slices/interaction';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import AddComment from './AddComment';

function Film() {
  const {id}     = useParams();
  const user     = useAppSelector(userState);
  const {id: userId, isOnline}     = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const {data: movie, isLoading: isMovieLoading} = useGetOneMovieQuery(id!);
  const {data: reviews, isLoading: isReviewsLoad} = useGetAllReviewsQuery(id!);
  const {
    data: userReview, 
    isLoading: isUserReviewLoad, 
    isError: isUserReviewError, 
    isSuccess: isUserReviewSuccess
  } = useGetOneReviewQuery({userId: user.id!, movieId: id! });
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  useEffect(() => {
    if (isOnline && reviews) {
      const userComment = reviews.find((review) => review.user_id === userId);
      userComment && setFilteredReviews([{...userComment, edit: true}, ...reviews]);
    }
  }, [isOnline, reviews]);

  useEffect(() => {
    // Reset interactions
    dispatch(setInactive());
    // Set reviews from db (if no error/no data)
    if (typeof userReview !== 'string' && !isUserReviewLoad && !isUserReviewError) {
      dispatch(setActive(userReview![0]));
    }}, [user, userReview, isUserReviewLoad, reviews]);
  

  return (
    <AnimationLayout>
      {movie &&
        <main className={styles.film}>
          <Content movie={movie} isLoading={isMovieLoading}/>
          <h3 className={styles['title']}>Commentaires ({reviews ? reviews.length : '~'})</h3>
          <div className={styles.comments}>
            {(isUserReviewSuccess && !userReview[0].comment) && 
              <AddComment props={{text: userReview[0].comment, date: userReview[0].updated_at}}/>}

            {(!isReviewsLoad && filteredReviews) && filteredReviews.map((review: any, index:any) => (
              <Comment key={index} edit={review.edit} pic={review.avatar_url} name={review.user_pseudo} date={review.created_at} text={review.comment} rating={review.rating} />))
            }
            {
              (!reviews) && <p style={{textAlign: 'center', margin: '1em 0'}}>Aucun commentaire pour ce film</p>
            }
            {
              (isReviewsLoad) &&
              <div style={{textAlign: 'center'}}><Loader /></div>
            }
          </div>
        </main>}
      {isMovieLoading && <Loader isMaxed/>}

    </AnimationLayout>
  );
};

export default Film;