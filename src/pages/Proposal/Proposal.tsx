import ButtonSearch from 'components/Buttons/ButtonSearch';
import Input from 'components/Input/Input';
import styles from './Proposal.module.scss';
import { ReactComponent as Search } from './input_search.svg';
import MovieGrid from './MoviesGrid/MovieGrid';
import Description from './Description/Description';

function Proposal() {
  return (
    <>
      <section className={styles.proposal}>
        <h1 className={styles.title}>Ajouter un film</h1>
        <form className={styles.episode}>
          <label htmlFor='episode'>Selectionez un épisode</label>
          <div className={styles.select}>
            <span>Saison 2</span>
            <select name='episode' id='episode'>
              <option value=''>--- Choissisez votre épisode ---</option>
              <option value=''>Episode 1</option>
              <option value=''>Episode 2</option>
              <option value=''>Episode 3</option>
            </select>
          </div>
        </form>
        <h2 className={styles.subtitle}>Recherche un film</h2>
        <p className={styles.description}>Plus un film est <span>disponible</span>, plus il sera regardé. Surprenez - nous, mais ne négligez pas l’accessibilité !</p>
        <form className={styles['search-form']}>
          <Input label='' name='search' type='text' placeholder='Recherche un film'/>
          <ButtonSearch><Search /></ButtonSearch>
        </form>
      </section>
      <MovieGrid />
      <Description />
    </>
  );
}

export default Proposal;