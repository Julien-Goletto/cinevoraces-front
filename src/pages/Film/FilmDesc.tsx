import { useState } from 'react';
import { usePostInteractionMutation,usePutInteractionMutation } from 'redux/api';
import { useGetOneReviewQuery } from 'redux/api';
import Description from './Description';
import useSeeMore from 'hooks/useSeeMore';
import Interaction from 'components/Interaction/Interaction';
import Avatar from 'components/Avatar/Avatar';
import styles from './FilmDesc.module.scss';

interface FilmDescProps {
  movie: DBMovie,
  userId: number | undefined
}
interface InteractionProps extends FilmDescProps {
  data: DBUserReview
}

function FilmDesc({movie, userId}: FilmDescProps) {
  const {data: interactionsData} = useGetOneReviewQuery({userId: userId!, movieId: movie.id});
  const sliceText = useSeeMore(movie.presentation, 700);

  return (
    <div className={styles.desc}>
      <div className={styles.wrapper}>
        <Poster src={movie.poster_url} alt={`Affiche du film ${movie.french_title}`}/>
        {interactionsData && 
          <Interactions movie={movie} userId={userId} data={interactionsData}/>}
      </div>
      <Description movie={movie}/>
      <div className={styles.presentation}>
        <Avatar img={movie.user_avatar_url} asInfo={{username: movie.user_pseudo, date: movie.publishing_date}} />
        {sliceText}
      </div>
    </div>
  );
};

function Interactions({movie, userId, data}: InteractionProps) {
  const movieId = movie.id;
  const [postInteraction]             = usePostInteractionMutation();
  const [putInteraction, {isLoading}] = usePutInteractionMutation();
  const [state, setState]             = useState({
    bookmarked: data.bookmarked, 
    viewed: data.viewed, 
    liked: data.liked, 
    rating: data.rating
  });

  const handleInteractions = async (type: string) => {
    const body = {
      ...state,
      [type]: !Object.entries(state).find(
        e => e[0] === type)![1]};
    const ids = {userId: userId!, movieId: movieId};
    await postInteraction({...ids});
    await putInteraction({...ids, body: body});
    setState(body);
  };
  const handleRating = async (n: number) => {
    const body = {...state, rating: n};
    const ids = {userId: userId!, movieId: movieId};
    await postInteraction({...ids});
    await putInteraction({...ids, body: body});
    setState(body);
  };

  return(
    <div className={styles.interactions}>
      <Interaction
        value={state.bookmarked}
        handler={handleInteractions}
        type='bookmarked'
        count={Number(movie.watchlist_count)}
        loader={isLoading}
      />
      <Interaction
        value={state.viewed}
        handler={handleInteractions}
        type='viewed'
        count={Number(movie.views_count)}
        loader={isLoading}
      />
      <Interaction 
        value={state.liked}
        handler={handleInteractions}
        type='liked'
        count={Number(movie.likes_count)}
        loader={isLoading}
      />
      <Interaction
        value={state.rating}
        handler={handleRating}
        type='starred'
        count={Number(movie.ratings_count)}
        loader={isLoading}
      />
    </div>
  );
}

function Poster ({src, alt}: {[key:string]: string}) {
  return(
    <div className={styles.poster}>
      <img src={src} alt={alt}/>
    </div>
  );
}

export default FilmDesc;