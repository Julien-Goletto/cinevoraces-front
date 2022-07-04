import { userInteractions, toggle, setRating } from 'redux/slices/interaction';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userLogged } from 'redux/slices/user';
import { useParams } from 'react-router-dom';
import { usePostInteractionMutation,usePutInteractionMutation } from 'redux/api';
import Interaction from 'components/Interaction/Interaction';
import styles from './InteractionsWrapper.module.scss';

type InteractionsWrapperProps ={
  movie: DBMovie
}

function InteractionsWrapper({movie}: InteractionsWrapperProps) {
  const dispatch                      = useAppDispatch();
  const {id: movieId}                 = useParams<string>();
  const {id: userId}                  = useAppSelector(userLogged);
  const interactionState              = useAppSelector(userInteractions);
  const {reviews, viewed, rating, bookmarked, liked} = interactionState;
  const [postInteraction]             = usePostInteractionMutation();
  const [putInteraction, {isLoading}] = usePutInteractionMutation();

  // POST/PUT handler for user interactions
  const dispatchInteraction = async (type: string) => {
    const body = {
      userId: userId!,
      movieId: movieId!,
      body: {
        // Resolve content with passed string
        [type]: !Object.entries(interactionState).find(
          e => e[0] === type)![1]
      }};
    !reviews && await postInteraction({userId: userId!, movieId: movieId!});
    await putInteraction(body); // Fetch data base
    dispatch(toggle(type)); // update local state
  };
  // POST/PUT handler for movie rating
  const dispatchRating = async (n: number) => {
    const body = {
      userId: userId!,
      movieId: movieId!,
      body: {rating: n}
    };
    !reviews && await postInteraction({userId: userId!, movieId: movieId!});
    await putInteraction(body);
    dispatch(setRating(n));
  };

  return(
    <div className={styles['interactions-wrapper']}>
      <Interaction
        value={bookmarked}
        handler={dispatchInteraction}
        type='bookmarked'
        count={Number(movie.watchlist_count)}
        loader={isLoading}
      />
      <Interaction
        value={viewed}
        handler={dispatchInteraction}
        type='viewed'
        count={Number(movie.views_count)}
        loader={isLoading}
      />
      <Interaction 
        value={liked}
        handler={dispatchInteraction}
        type='liked'
        count={Number(movie.likes_count)}
        loader={isLoading}
      />
      <Interaction
        value={rating}
        handler={dispatchRating}
        type='starred'
        count={Number(movie.ratings_count)}
        loader={isLoading}
      />
    </div>
  );
}

export default InteractionsWrapper;