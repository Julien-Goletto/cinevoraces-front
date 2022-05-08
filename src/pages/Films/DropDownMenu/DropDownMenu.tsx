import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { filters, setSeasonFilter } from 'redux/slices/filter';
import { FieldsetRadio, FieldsetCheckbox, FieldsetDate } from './Fieldsets';
import styles from './DropDownMenu.module.scss';

function DropDownMenu() {
  const { seasons, isViewed, tags } = useAppSelector(filters);
  const dispatch = useAppDispatch();

  const handleReset = (e:mouseEvent) => {
    e.preventDefault();
    // TODO: Code me
  };
  const handleSeasonFilter = (event: onChangeEvent) => {
    console.log(seasons);
    const value = String(event.target.value);
    dispatch(setSeasonFilter(value));
  };
  const handleIsViewedFilter = (event: onChangeEvent) => {
    console.log(event.target.value);
    // TODO: Code me
  };

  return(
    <form className={styles['drop-down-menu']}>
      <button
        className={styles['fieldset-reset']}
        onClick={handleReset}
      >
        Éffacer filtres
      </button>
      <FieldsetRadio 
        array={seasons}
        handler={handleSeasonFilter}
      />
      <FieldsetRadio 
        array={isViewed}
        handler={handleIsViewedFilter}
      />
      { tags.map(({tagName, tags}, key) => 
        <FieldsetCheckbox
          key={key}
          array={tags}
          tagName={tagName}
          handler={handleSeasonFilter}
        />
      )}
      <FieldsetDate/>
    </form>
  );
}

export default DropDownMenu;