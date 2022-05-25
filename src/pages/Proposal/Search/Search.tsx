import styles from './Search.module.scss';
import Input from 'components/Input/Input';
import { ButtonSearch } from 'components/Buttons/Button';
import { ReactComponent as SearchIco } from '../input_search.svg';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setSearch, getInputValue, setInputValue } from 'redux/slices/proposal';

function Search() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(getInputValue);
  const onChangeHandler = (event: onChangeEvent) => {
    const value = event.target.value;
    dispatch(setInputValue(value));
  };
  const submitSearch = (e:any) => {
    e.preventDefault();
    dispatch(setSearch(value));
  };
  
  return (
    <>
      <form onSubmit={submitSearch} className={styles['search-form']}>
        <Input 
          label='' 
          name='search'
          type='text'
          placeholder='Recherche un film'
          value={value}
          onChange={onChangeHandler}
        />
        <ButtonSearch><SearchIco /></ButtonSearch>
      </form>
    </>
  );
}

export default Search;