import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { filters, setSeasonFilter, setTagFilter } from 'redux/slices/filter';
import { FieldsetRadio, FieldsetCheckbox, FieldsetDate } from './Fieldsets';
import styles from './DropDownMenu.module.scss';

function DropDownMenu() {
  const {seasons, tags, } = useAppSelector(filters);
  const dispatch = useAppDispatch();
  const handleSeasonFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = String(event.target.value);
    dispatch(setSeasonFilter(value));
  };
  const handleIsTagsFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const object = {
      tagName: event.target.dataset.set,
      tag: event.target.value
    };
    dispatch(setTagFilter(object));
  };

  return(
    <form className={styles['drop-down-menu']}>
      <FieldsetRadio 
        array={seasons}
        label='season'
        handler={handleSeasonFilter}
      />
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