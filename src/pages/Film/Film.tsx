import { Button } from 'components/Buttons/Button';
import Content from './Content';
import styles from './Film.module.scss';
import Comment from './Comment';
import { useOneMovieQuery, useMovieReviewsQuery, useGetReviewsQuery, useRefreshTokenMutation } from 'redux/api';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userLogged } from 'redux/slices/user';
import { useEffect, useState } from 'react';
import { setActive, setInactive } from 'redux/slices/interaction';
import AddComment from './AddComment';


function Film() {
  const { id }  = useParams();
  const user = useAppSelector(userLogged);
  const dispatch = useAppDispatch();
  const { data: movie, isLoading: isMovieLoad } = useOneMovieQuery<any>(Number(id));
  const { data: comment, isLoading: isCommentLoad } = useMovieReviewsQuery<any>(Number(id));
  const { data: reviews, isLoading: isReviewsLoad, isError: isReviewsError, isSuccess: isReviewsSuccess  } = useGetReviewsQuery({userId: user.id, movieId: id });
  const [filteredComment, setFilteredComment] = useState(comment);
  const [refreshToken, handle] = useRefreshTokenMutation();

  function filterComment(userId: number | null, comments:any) {
    if(!comments) return false;
    let userComment = comments.find((comment:any) => comment.user_id === userId);
    if(!user.isOnline || !userComment) return comments;
    let filterComment = comments.filter((comment:any) => comment.user_id !== userId);
    console.log([{...userComment, edit: true}, ...filterComment]);
    return [{...userComment, edit: true}, ...filterComment];
  }

  useEffect(()=> {
    dispatch(setInactive());
    refreshToken();
    console.log(reviews);
    setFilteredComment(filterComment(user.id, comment));
    if(typeof reviews !== 'string' && !isReviewsLoad && !isReviewsError) {
      dispatch(setActive(reviews));
       
    }
  },[user, refreshToken, reviews, dispatch, isReviewsLoad, isReviewsError, comment, movie] );
  

  return (
    <section className={styles.film}>
      <Content 
        movie={movie} 
        isLoading={isMovieLoad}
      />
      <h3 className={styles['title']}>Commentaires ({comment ? comment.length : '~'})</h3>
      <div className={styles.comments}>
        {
          // SI AUCUN COMMENTAIRE
          (isReviewsSuccess && !reviews[0].comment) && <AddComment props={{text: reviews.comment, pic:'', date: reviews.updated_at, name: 'Jambon'  }} />
        }
        {
          // SI COMMENTAIRE LOAD, AFFICHE COMMENTAIRES
          (!isCommentLoad && filteredComment) && filteredComment.map((review: any, index:any) => (
            <Comment key={index} edit={review.edit} pic={review.avatar_url} name={review.user_pseudo} date={review.created_at} text={review.comment} rating={review.rating} />
          ))
        }
        {
          // SI AUCUN COMMENTAIRE
          (!comment) && <p style={{textAlign: 'center', margin: '1em 0'}}>Aucun commentaire pour ce film</p>
        }
        {
          // LOADING COMMENT
          (isCommentLoad) &&
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