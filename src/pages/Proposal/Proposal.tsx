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
import { apiTmdb } from 'redux/apiTmdb';


function Proposal() {
  const search = useAppSelector(getSearch);
  const navigate = useNavigate();
  const proposalMovie = useAppSelector(getProposalData);
  const [seasonSelect, setSeasonSelect] = useState<number | string>('~');
  const [searchTrigger, { data, isFetching: isDetailsFetching, ...rest }] = apiTmdb.endpoints.tmbdCustomDetails.useLazyQuery();
  const { data: slots, isSuccess: isSlotsSuccess } = useAvailableSlotsQuery();
  const [sendBook, bookHandle] = useBookSlotMutation();
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
    const res:any = await sendPost(proposalMovie);
    if(res.data === 'Film ajouté en base') {
      await sendBook(proposalMovie.publishing_date);
    }
  };

  
  useEffect(()=> {  
    if(postHandle.isSuccess && bookHandle.isSuccess) {
      dispatch(addToast({type: 'success', text: 'Votre film à bien été enregistré'}));
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
  }, [postHandle, bookHandle, slots ]);


  
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
        <Search searchTrigger={searchTrigger} />
      </section>
      <MovieGrid movies={data} isFetching={isDetailsFetching} />
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