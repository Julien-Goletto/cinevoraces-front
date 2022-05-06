import { useState } from 'react';
import styles from './DropDownMenu.module.scss';

type SeasonProps = { array: number[] }
type TagsProps = { array: string[], tagName: string }

function FieldsetSeason({array}: SeasonProps) {
  return(
    <fieldset className={styles.fieldset}>
      <ul>
        <li>
          <label>
            Tout les films
            <input 
              className={styles.fieldset__element}
              type='radio'
              value='all'
              name='season'
            />
          </label>
        </li>

        { array.map((season) => 
          <li>
            <label>
              Saison {season}
              <input 
                className={styles.fieldset__element}
                type='radio'
                value={season}
                name='season'
              />
            </label>
          </li>
        )}
      </ul>
    </fieldset>
  );
}

function FieldsetViewed() {
  return(
    <fieldset className={styles.fieldset}>
      <ul>
        <li>
          <label>
            Vus
            <input 
              className={styles.fieldset__element}
              type='radio' value='true' name='isViewed'
            />
          </label>
        </li>
        <li>
          <label>
            À voir
            <input 
              className={styles.fieldset__element}
              type='radio' value='false' name='isViewed'
            />
          </label>
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
    <fieldset className={styles['fieldset__tags']}>
      <ul>
        <button
          className={styles.fieldset__element}
          onClick={handleTagsDropDown}
        >
          {tagName}<img src='images/arrow-right.svg' alt='' />
        </button>
        { isOpen &&
          array.map((tag) =>
            <li className={styles.fieldset__element}>
              <label htmlFor={tag}>
                {tag}
              </label>
              <input 
                className={styles.fieldset__element}
                type='checkbox'
                value={tag}
                id={tag}
              />
            </li>
          )}
      </ul>
    </fieldset>
  );
}

export { FieldsetSeason, FieldsetViewed, FieldsetTags };