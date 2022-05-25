import styles from './Proposal.module.scss';
import MovieGrid from './MoviesGrid/MovieGrid';
import Description from './Description/Description';
import Option from './Option/Option';
import Search from './Search/Search';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProposalData, getSearch, setEpisode, unsetEpisode } from 'redux/slices/proposal';
import { Button } from 'components/Buttons/Button';
import { useTmbdCustomDetailsQuery } from 'redux/apiTmdb';
import { addToast } from 'redux/slices/global';
import { usePostMovieMutation, useRefreshTokenMutation, useAvailableSlotsQuery, useBookSlotMutation } from 'redux/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Proposal() {
  const search = useAppSelector(getSearch);
  const navigate = useNavigate();
  const proposalMovie = useAppSelector(getProposalData);
  const [seasonSelect, setSeasonSelect] = useState<number | string>('~');
  const { data, isLoading: isDetailsLoading } = useTmbdCustomDetailsQuery(search);
  const { data: slots, isSuccess: isSlotsSuccess } = useAvailableSlotsQuery();
  const [sendBook] = useBookSlotMutation();
  const [sendPost, postHandle] = usePostMovieMutation();
  const dispatch = useAppDispatch();
  
  const handleSelect = (event: onChangeFormEvent) => {
    const selected = (event.target as HTMLSelectElement).value;
    const episode = slots.find((slot:any) => slot.episode == selected);
    setSeasonSelect(episode ? episode.season_number : '~');

    if(episode) {
      dispatch(setEpisode({
        episode_selected: selected,
        episode_publish_date: episode.publishing_date,
        season_id: episode.season_number
      }));
    } else dispatch(unsetEpisode());
  };

  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const { presentation, user_id }: any = proposalMovie;
    if(!presentation || !user_id) {
      dispatch(addToast({type: 'error', text:'Formulaire invalide'}));
      return;
    }
    await sendPost(proposalMovie);
    await sendBook(proposalMovie.publishing_date);
  };
  
  useEffect(()=> {  
    if(postHandle.isSuccess) {
      dispatch(addToast({type: 'success', text: 'Votre film à bien été enregistrer'}));
      setTimeout(()=> {
        navigate('/', {state: {}, replace: true});
      },1000);
    }
    if(typeof slots === 'string') {
      dispatch(addToast({type: 'warn', text:`${slots}`, duration:6000}));
      setTimeout(()=> {
        navigate('/');
      }, 100);
    }
  }, [postHandle, slots]);


  
  return (
    <>
      <section className={styles.proposal}>
        <h1 className={styles.title}>Ajouter un film</h1>
        <form onChange={handleSelect} className={styles.episode}>
          <label htmlFor='episode'>Selectionez un épisode</label>
          <div className={styles.select}>
            <span>Saison - {seasonSelect}</span>
            <select name='episode' id='episode'>
              <option value='x'>--- Choissisez votre épisode ---</option>
              {(slots && isSlotsSuccess && typeof slots !== 'string') && slots.map((slot:any) => (
                <Option slot={slot} key={slot.id} />
              ))}
            </select>
          </div>
        </form>
        <h2 className={styles.subtitle}>Recherche un film</h2>
        <p className={styles.description}>Plus un film est <span>disponible</span>, plus il sera regardé. Surprenez - nous, mais ne négligez pas l’accessibilité !</p>
        <Search />
      </section>
      <MovieGrid movies={data} isLoading={isDetailsLoading} />
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