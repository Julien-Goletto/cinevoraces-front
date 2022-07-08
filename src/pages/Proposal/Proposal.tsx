import { ReactComponent as SearchIco } from './Proposal.ico_search.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { usePostMovieMutation, useGetSlotsQuery, usePutSlotMutation } from 'redux/api';
import { addToast } from 'redux/slices/global';
import { apiTmdb } from 'redux/apiTmdb';
import { userState } from 'redux/slices/user';
import { Button, InputText } from 'components/Inputs/InputsLib';
import MovieGrid from './MoviesGrid/MovieGrid';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Proposal.module.scss';

type SearchBarProps = {
  value: string,
  onChange(e: React.ChangeEvent<HTMLInputElement>): void,
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}
type SelectSlotProps = {
  onChange(e: React.FormEvent<HTMLSelectElement>): void,
  slots: slot[]
}
type AddCommentProps = {
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

function Proposal() {
  const {id}     = useAppSelector(userState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedSlot, setSelectedSlot] = useState<{[key: string]: string}>({});
  const [movie, setMovie]               = useState<{[key: string]: string}>({});
  const [comment, setComment]           = useState('');
  const [query, setQuery]               = useState('');
  const [sendBook, {isSuccess: isBookHandleSuccess}] = usePutSlotMutation();
  const [sendPost, {isSuccess: isPostMovieSuccess}] = usePostMovieMutation();
  const [searchTrigger, {
    data: tmdbData, 
    isFetching: isDetailsFetching}] = apiTmdb.endpoints.tmbdCustomDetails.useLazyQuery();
  const {
    data: slots, 
    isSuccess: isSlotsSuccess, 
    isError: isSlotsError} = useGetSlotsQuery();

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    // Resolve selected slot with SelectElement value
    const slot = slots!.find((slot) => String(slot.episode) === e.currentTarget.value);
    // Update state if slot is defined 
    slot && setSelectedSlot({
      episode_selected: String(slot.episode),
      episode_publish_date: slot.publishing_date,
      season_id: String(slot.season_number)
    });
  };
  const handlePresentation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchTrigger(query, false);
  };
  const handleSubmit = async () => {
    if (comment.length <= 1) {
      dispatch(addToast({type: 'error', text:'Formulaire invalide'}));
    } else {
      await sendPost({
        ...selectedSlot, 
        presentation: comment, 
        user_id: id!
      });
      await sendBook({
        publishing_date: selectedSlot.publishing_date!
      });
    }};

  // Handle PUT success
  useEffect(() => {  
    if (isPostMovieSuccess && isBookHandleSuccess) {
      dispatch(addToast({type: 'success', text: 'Votre film à bien été enregistré'}));
      setTimeout(()=> {
        navigate('/', {state: {}, replace: true});
      },1000);
    }}, [isPostMovieSuccess, isBookHandleSuccess, slots]);

  return (
    <AnimationLayout>
      <main className={styles.proposal}>
        <h1>Ajouter un film</h1>
        <Notice/>
        {isSlotsError && 
          <h2>Aucun créneau n'est disponible, réessayez plus tard.</h2>}
        {isSlotsSuccess &&
          <SelectSlot onChange={handleSelect} slots={slots}/>}
        <h2>Recherche un film</h2>
        <SearchBar value={query} onChange={handleSearch} onSubmit={submitSearch}/>
      </main>
      <MovieGrid movies={tmdbData} isFetching={isDetailsFetching} />
      <AddComment onChange={handlePresentation}/>
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

function SelectSlot({onChange, slots}: SelectSlotProps) {
  return(
    <form className={styles['slot-selector']}>
      <label htmlFor='episode'>Selectionez un épisode</label>
      <select onChange={onChange} name='episode' id='episode'>
        <option value='x'>Aucun épisode</option>
        {slots.map(({id, episode, publishing_date, season_number, is_booked}) => (
          !is_booked && <option value={episode} key={id}>
            Saison {season_number} Épisode {episode} - {publishing_date}
          </option>))}
      </select>
    </form>
  );
};

function AddComment({onChange}: AddCommentProps) {
  return (
    <section className={styles.description2}>
      <h2 className={styles.title}>Motivez votre choix</h2>
      <p className={styles.text}>Décrivez aux utilisiteurs pourquoi vous proposez <span>ce film</span>.</p>
      <textarea onChange={onChange} placeholder='Decrire votre avis sur le film' className={styles.input} name='description' rows={12} maxLength={1200}></textarea>
    </section>
  );
}

function SearchBar({value, onChange, onSubmit}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className={styles['search-form']}>
      <InputText 
        name='search' 
        type='text' 
        placeholder='Recherche un film'
        value={value}
        handler={onChange}
      />
      <button><SearchIco/></button>
    </form>
  );
}

function Notice() {
  return(
    <p>
      Plus un film est <span>disponible</span>, plus il sera regardé.
      Surprenez-nous, mais ne négligez pas l’accessibilité!
    </p>
  );
}

export default Proposal;