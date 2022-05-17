import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { filters, resetAllFilters, setSeasonFilter, setIsViewedFilter, setTagFilter } from 'redux/slices/filter';
import { FieldsetRadio, FieldsetCheckbox, FieldsetDate } from './Fieldsets';
import styles from './DropDownMenu.module.scss';

function DropDownMenu() {
  const { seasons, isViewed, tags, isDefault } = useAppSelector(filters);
  const dispatch = useAppDispatch();
  
  const handleReset = (e:mouseEvent) =>  {
    // FIXME: This event does not re-render components
    e.preventDefault();
    dispatch(resetAllFilters());  
  };
  const handleSeasonFilter = (event: onChangeEvent) => {
    const value = String(event.target.value);
    dispatch(setSeasonFilter(value));
  };
  const handleIsViewedFilter = (event: onChangeEvent) => {
    const value = String(event.target.value);
    dispatch(setIsViewedFilter(value));
  };
  const handleIsTagsFilter = (event: onChangeEvent) => {
    const object = {
      tagName: event.target.dataset.set,
      tag: event.target.value
    };
    dispatch(setTagFilter(object));
  };

  return(
    <form className={styles['drop-down-menu']}>
      <button
        className={`
        ${(isDefault) ? styles['fieldset-reset--hidden'] : styles['fieldset-reset']}
        `}
        onClick={handleReset}
      >
        <img src='/images/arrow-counterclockwise.svg' alt='' />
      </button>
      <FieldsetRadio 
        array={seasons}
        label='season'
        handler={handleSeasonFilter}
      />
      {/* TODO: Make this work */}
      {/* <FieldsetRadio 
        array={isViewed}
        label='isViewed'
        handler={handleIsViewedFilter}
      /> */}
      { tags.map(({tagName, tags}, key) => 
        <FieldsetCheckbox
          key={key}
          array={tags}
          tagName={tagName}
          handler={handleIsTagsFilter}
        />
      )}
      <FieldsetDate/>
    </form>
  );
}

export default DropDownMenu;