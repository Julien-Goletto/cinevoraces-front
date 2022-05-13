import styles from './Search.module.scss';
import { ButtonSearch } from 'components/Buttons/Button';
import Input from 'components/Input/Input';
import { ReactComponent as SearchIco } from '../input_search.svg';
import { useAppDispatch } from 'redux/hooks';
import { setSearch } from 'redux/slices/proposal';

function Search() {
  const dispatch = useAppDispatch();
  const submitSearch = (e:any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(setSearch(data.get('search')));
  };
  
  return (
    <>
      <form onSubmit={submitSearch} className={styles['search-form']}>
        <Input label='' name='search' type='text' placeholder='Recherche un film'/>
        <ButtonSearch><SearchIco /></ButtonSearch>
      </form>
    </>
  );
}

export default Search;