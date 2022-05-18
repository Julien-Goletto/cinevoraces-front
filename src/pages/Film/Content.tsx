import Interactions from 'components/Interactions/Interactions';
import Presentation from './Presentation';
import Description from './Description';
import styles from './Content.module.scss';
import { useEffect } from 'react';

function Content({ movie, isLoading }: Content) {

  if (!isLoading) {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            
            <div 
              className={styles.poster}
              key={movie.id}
            >
              <img 
                src={movie.poster_url} 
                alt={movie.french_title}
                className={styles.img} 
              />
            </div>
            
            <div className={styles.interactions}> 
              <Interactions type='bookmark' count={Number(movie.watchlist_count)}/>
              <Interactions type='view' count={0}/>
              <Interactions type='like' count={Number(movie.likes_count)}/>
              <Interactions type='star' count={Number(movie.ratings_count)}/>
            </div>
          </div>
          <Description movie={movie} />
          <Presentation pic={'/fake_data/pictures/profilpic.png'} name={'Jean Cule'} date='7 janvier 2022'
            text={movie.presentation} rating={2}/>
        </div>
      </>
    );
  } else return null;
};

export default Content;