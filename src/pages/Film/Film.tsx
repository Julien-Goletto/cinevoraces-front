import { Button } from 'components/Buttons/Button';
import Content from './Content';
import styles from './Film.module.scss';
import Comment from './Comment';
import fake_data from './fakedata.js';
import { useOneMovieQuery, useMovieReviewsQuery } from 'redux/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from 'components/Loader/Loader';


function Film() {
  const { id }  = useParams();
  const { data: movie, isLoading: isMovieLoad } = useOneMovieQuery<any>(Number(id));
  const { data: reviews, isLoading: isReviewsLoad } = useMovieReviewsQuery<any>(Number(id));
  

  return (
    <section className={styles.film}>
      <Content 
        movie={movie} 
        isLoading={isMovieLoad}
      />
      <h3 className={styles['title']}>Commentaires ({reviews ? reviews.length : '~'})</h3>
      <div className={styles.comments}>
        {
          (!isReviewsLoad && reviews) && reviews.map((review: any, index:any) => (
            <Comment key={index} pic={review.avatar_url} name={review.user_pseudo} date={review.created_at} text={review.comment} rating={review.rating} />
          ))
        }
        {(!reviews) && <p style={{textAlign: 'center', margin: '1em 0'}}>Aucun commentaire pour ce film</p>}
        {(isReviewsLoad) &&
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