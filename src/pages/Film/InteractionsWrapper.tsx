import { userInteractions, toggle, setRating } from 'redux/slices/interaction';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userLogged } from 'redux/slices/user';
import { addToast } from 'redux/slices/global';
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
  const {isOnline, id: userId}        = useAppSelector(userLogged);
  const interactionState              = useAppSelector(userInteractions);
  const {reviews, viewed, rating, bookmarked, liked} = interactionState;
  const [postInteraction]             = usePostInteractionMutation();
  const [putInteraction, {isLoading}] = usePutInteractionMutation();

  // POST/PUT handler for user interactions
  const dispatchInteraction = async (type: string) => {
    try {
      if (isOnline) {
        const body = {
          userId: userId,
          movieId: movieId,
          body: {
            [type]: !Object.entries(interactionState).find(
              e => e[0] === type)![1]
          }};
        // TODO: This should already exist in data base
        !reviews && await postInteraction({userId: userId, movieId: movieId});

        await putInteraction(body);
        dispatch(toggle(type));
      } else {
        throw new Error('Vous devez être connecté pour intéragir.');
      }
    } catch (error: any) {
      dispatch(addToast({type: 'warn', text: error.message}));
    }    
  };
  // POST/PUT handler for movie rating
  const dispatchRating = async (n: number) => {
    try {
      if (isOnline) {
        const body = {
          userId: userId,
          movieId: movieId,
          body: {rating: n}
        };
        // TODO: This should already exist in data base
        !reviews && await postInteraction({userId: userId, movieId: movieId});

        await putInteraction(body);
        dispatch(setRating(n));
      } else {
        throw new Error('Vous devez être connecté pour intéragir.');
      }
    } catch (error: any) {
      dispatch(addToast({type: 'warn', text: error.message}));
    }    
  };

  return(
    <div className={styles['interactions-wrapper']}>
      <Interaction 
        value={liked}
        handler={dispatchInteraction}
        type='liked'
        count={Number(movie.likes_count)}
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
        value={bookmarked}
        handler={dispatchInteraction}
        type='bookmarked'
        count={Number(movie.watchlist_count)}
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