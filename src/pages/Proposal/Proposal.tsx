import styles from './Proposal.module.scss';
import MovieGrid from './MoviesGrid/MovieGrid';
import Description from './Description/Description';
import Option from './Option/Option';
import Search from './Search/Search';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProposalData, setEpisode, unsetEpisode } from 'redux/slices/proposal';
import { Button } from 'components/Inputs/InputsLib';
import { addToast } from 'redux/slices/global';
import { usePostMovieMutation, useGetSlotsQuery, usePutSlotMutation } from 'redux/api';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { apiTmdb } from 'redux/apiTmdb';
import { userState } from 'redux/slices/user';


function Proposal() {
  const navigate = useNavigate();
  const {id} = useAppSelector(userState);
  const proposalMovie = useAppSelector(getProposalData);
  const [seasonSelect, setSeasonSelect] = useState<number | string>('~');
  const [searchTrigger, { data, isFetching: isDetailsFetching}] = apiTmdb.endpoints.tmbdCustomDetails.useLazyQuery();
  const {data: slots, isSuccess: isSlotsSuccess} = useGetSlotsQuery();
  const [sendBook, {isSuccess: isBookHandleSuccess}] = usePutSlotMutation();
  const [sendPost, {isSuccess: isPostMovieSuccess}] = usePostMovieMutation();
  const dispatch = useAppDispatch();

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const selected = Number(e.currentTarget.value);
    const episode = slots!.find((slot) => slot.episode === selected);
    setSeasonSelect(episode ? episode.season_number : '~');
    if (episode) {
      dispatch(setEpisode({
        episode_selected: selected,
        episode_publish_date: episode.publishing_date,
        season_id: episode.season_number
      }));
    } else dispatch(unsetEpisode());
  };
  
  const handleSubmit = async () => {
    if (proposalMovie.presentation.length <= 1) {
      dispatch(addToast({type: 'error', text:'Formulaire invalide'}));
    } else {
      await sendPost({...proposalMovie, user_id: id!});
      await sendBook({publishing_date: proposalMovie.publishing_date!});
    }};

  
  useEffect(() => {  
    if (isPostMovieSuccess && isBookHandleSuccess) {
      dispatch(addToast({type: 'success', text: 'Votre film à bien été enregistré'}));
      setTimeout(()=> {
        navigate('/', {state: {}, replace: true});
      },1000);
    }
    if (typeof slots === 'string') {
      dispatch(addToast({type: 'warn', text:`${slots}`, duration:6000}));
      setTimeout(()=> {
        navigate('/');
      }, 100);
    }
  }, [isPostMovieSuccess, isBookHandleSuccess, slots ]);


  
  return (
    <AnimationLayout>
      <section className={styles.proposal}>
        <h1 className={styles.title}>Ajouter un film</h1>
        <form className={styles.episode}>
          <label htmlFor='episode'>Selectionez un épisode</label>
          <div className={styles.select}>
            <span>Saison - {seasonSelect}</span>
            <select onChange={handleSelect} name='episode' id='episode'>
              <option value='x'>--- Choissisez votre épisode ---</option>
              {(slots && isSlotsSuccess && typeof slots !== 'string') && slots.map((slot) => (
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
    </AnimationLayout>
  );
}

export default Proposal;