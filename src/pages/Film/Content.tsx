import InteractionsWrapper from './InteractionsWrapper';
import Presentation from './Presentation';
import Description from './Description';
import styles from './Content.module.scss';
import { useEffect, useState } from 'react';

function Content({ movie, isLoading }: Content) {
  const [date, setDate] = useState<string>();
  
  useEffect(()=> {
    if(!isLoading && movie){
      let formatDate = new Date(movie.publishing_date);
      setDate(formatDate.toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'}));
    }
  }, [movie, isLoading, date]);

  if (!isLoading && date) {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.poster} key={movie.id}>
              <img 
                src={movie.poster_url} 
                alt={movie.french_title}
                className={styles.img} 
              />
            </div>
            <InteractionsWrapper movie={movie}/>
          </div>
          <Description movie={movie} />
          <Presentation pic={movie.user_avatar_url!} name={movie.user_pseudo} date={date}
            text={movie.presentation} rating={2}/>
        </div>
      </>
    );
  } else return null;
};

export default Content;