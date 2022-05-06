import { useState } from 'react';
import styles from './DropDownMenu.module.scss';

type SeasonProps = { array: number[] }
type TagsProps = { array: string[], tagName: string }

function FieldsetSeason({array}: SeasonProps) {
  return(
    <fieldset>
      <ul className={styles.fieldset}>
        <li>
          <input 
            className={styles.fieldset__element}
            type='radio'
            value='all'
            name='season'
          />
          <label htmlFor='all'>
            Tout les films
          </label>
        </li>

        { array.map((season) => 
          <li>
            <input 
              className={styles.fieldset__element}
              type='radio'
              value={season}
              name='season'
            />
            <label htmlFor='season'>
              Saison {season}
            </label>
          </li>
        )}
      </ul>
    </fieldset>
  );
}

function FieldsetViewed() {
  return(
    <fieldset>
      <ul className={styles.fieldset}>
        <li>
          <input 
            className={styles.fieldset__element}
            type='radio' value='true' name='season'
          />
          <label htmlFor='true'>Vus</label>
        </li>
        <li>
          <input 
            className={styles.fieldset__element}
            type='radio' value='true' name='season'
          />
          <label htmlFor='false'>À voir</label>
        </li>
      </ul>
    </fieldset>
  );
}

function FieldsetTags({ array, tagName }: TagsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleTagsDropDown = (e:eventButton) => {
    e.preventDefault();
    (isOpen) ? setIsOpen(false) : setIsOpen(true);
  };
  return(
    <fieldset>
      <ul className={styles['fieldset--tags']}>
        <button
          className={styles.fieldset__element}
          onClick={handleTagsDropDown}
        >
          {tagName}<img src='images/arrow-right.svg' alt='' />
        </button>
        { isOpen &&
          array.map((tag) =>
            <li>
              <label htmlFor={tagName}>
                {tag}
              </label>
              <input 
                className={styles.fieldset__element}
                type='checkbox'
                value={tag}
                name={tagName}
              />
            </li>
          )}
      </ul>
    </fieldset>
  );
}

export { FieldsetSeason, FieldsetViewed, FieldsetTags };