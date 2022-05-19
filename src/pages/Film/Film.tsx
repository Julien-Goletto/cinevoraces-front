import { Button } from 'components/Buttons/Button';
import Content from './Content';
import styles from './Film.module.scss';
import Comment from './Comment';
import { useOneMovieQuery, useMovieReviewsQuery, useGetReviewsQuery, useRefreshTokenMutation } from 'redux/api';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userLogged } from 'redux/slices/user';
import { useEffect } from 'react';
import { setActive, setInactive } from 'redux/slices/interaction';


function Film() {
  const { id }  = useParams();
  const user = useAppSelector(userLogged);
  const dispatch = useAppDispatch();
  const { data: movie, isLoading: isMovieLoad } = useOneMovieQuery<any>(Number(id));
  const { data: comment, isLoading: isCommentLoad } = useMovieReviewsQuery<any>(Number(id));
  const { data: reviews, isLoading: isReviewsLoad, isError: isReviewsError  } = useGetReviewsQuery({userId: user.id, movieId: id });
  const [refreshToken, handle] = useRefreshTokenMutation();
  
  useEffect(()=> {
    dispatch(setInactive());
    refreshToken();
    if(typeof reviews !== 'string' && !isReviewsLoad && !isReviewsError) {
      console.log(reviews);
      
      dispatch(setActive(reviews));
    }
  },[refreshToken, reviews, dispatch, isReviewsLoad, isReviewsError] );
  

  return (
    <section className={styles.film}>
      <Content 
        movie={movie} 
        isLoading={isMovieLoad}
      />
      <h3 className={styles['title']}>Commentaires ({comment ? comment.length : '~'})</h3>
      <div className={styles.comments}>
        {
          (!isCommentLoad && comment) && comment.map((review: any, index:any) => (
            <Comment key={index} pic={review.avatar_url} name={review.user_pseudo} date={review.created_at} text={review.comment} rating={review.rating} />
          ))
        }
        {(!comment) && <p style={{textAlign: 'center', margin: '1em 0'}}>Aucun commentaire pour ce film</p>}
        {(isCommentLoad) &&
          <div style={{textAlign: 'center'}}><Loader /></div>
        }
      </div>

      {/* <div className={styles.button}>
        <Button>
          Voir les commentaires (18)
        </Button>
      </div> */}
    </section>
  );
};

export default Film;