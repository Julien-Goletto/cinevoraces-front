import styles from './Proposal.module.scss';
import MovieGrid from './MoviesGrid/MovieGrid';
import Description from './Description/Description';
import Search from './Search/Search';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProposalData, getSearch, setEpisode } from 'redux/slices/proposal';
import { Button } from 'components/Buttons/Button';
import { useTmbdCustomDetailsQuery } from 'redux/apiTmdb';
import { addToast } from 'redux/slices/global';
import { usePostMovieMutation, useRefreshTokenMutation } from 'redux/api';
import { userLogged } from 'redux/slices/user';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Proposal() {
  const search = useAppSelector(getSearch);
  const navigate = useNavigate();
  const { data, isLoading } = useTmbdCustomDetailsQuery(search);
  const [triger, {data: res, isError, error}] = usePostMovieMutation();
  const [refreshToken, {error: tokenError, isError: isTokenError, isSuccess: isSuccessToken}] = useRefreshTokenMutation();
  const proposalMovie = useAppSelector(getProposalData);
  const dispatch = useAppDispatch();
  
  const handleSelect = (event: onChangeFormEvent) => {
    const selected = (event.target as HTMLSelectElement).value;
    dispatch(setEpisode(selected));
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const { presentation, user_id } = proposalMovie;
    if(!presentation || !user_id) {
      dispatch(addToast({type: 'error', text:'Formulaire invalide'}));
      console.log(proposalMovie); 
      return;
    }
    await refreshToken();
    await triger(proposalMovie);
  };

  useEffect(()=> {    
    if(isTokenError) {
      navigate('/');
    }
  }, [isTokenError]);

  
  return (
    <>
      <section className={styles.proposal}>
        <h1 className={styles.title}>Ajouter un film</h1>
        <form onChange={handleSelect} className={styles.episode}>
          <label htmlFor='episode'>Selectionez un épisode</label>
          <div className={styles.select}>
            <span>Saison 2</span>
            <select name='episode' id='episode'>
              <option value=''>--- Choissisez votre épisode ---</option>
              <option value='1'>Episode 1</option>
              <option value='2'>Episode 2</option>
              <option value='3'>Episode 3</option>
            </select>
          </div>
        </form>
        <h2 className={styles.subtitle}>Recherche un film</h2>
        <p className={styles.description}>Plus un film est <span>disponible</span>, plus il sera regardé. Surprenez - nous, mais ne négligez pas l’accessibilité !</p>
        <Search />
      </section>
      <MovieGrid movies={data} isLoading={isLoading} />
      <Description />
      <div className={styles.button}>
        <Button
          handler={handleSubmit}
          styleMod='fill-rounded'
        >
          <img src='/images/send-icon.svg' alt=''/>
          Envoyer
        </Button>
      </div>
    </>
  );
}

export default Proposal;