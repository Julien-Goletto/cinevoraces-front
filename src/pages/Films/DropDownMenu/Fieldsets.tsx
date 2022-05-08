import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './DropDownMenu.module.scss';

function FieldsetSeason({array}: FieldsetSeason) {
  return(
    <fieldset className={styles['fieldset']}>
      <ul>
        <li>
          <label>
            Tout les films
            <input 
              className={styles['fieldset-element']}
              type='radio'
              value='all'
              name='season'
            />
          </label>
          <button
            className={styles['fieldset-reset']}
          >
            Éffacer filtres
          </button>
        </li>

        { array.map((season, key) => 
          <li key={key}>
            <label>
              Saison {season}
              <input
                className={styles['fieldset-element']}
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
    <fieldset className={styles['fieldset']}>
      <ul>
        <li>
          <label>
            Tous
            <input 
              className={styles['fieldset-element']}
              type='radio' value='all' name='isViewed'
            />
          </label>
        </li>
        <li>
          <label>
            Vus
            <input 
              className={styles['fieldset-element']}
              type='radio' value='true' name='isViewed'
            />
          </label>
        </li>
        <li>
          <label>
            À voir
            <input 
              className={styles['fieldset-element']}
              type='radio' value='false' name='isViewed'
            />
          </label>
        </li>
      </ul>
    </fieldset>
  );
}

function FieldsetTags({ array, tagName }: FieldsetTag) {
  const [isOpen, setIsOpen] = useState(false);
  const handleTagsDropDown = (e:eventButton) => {
    e.preventDefault();
    (isOpen) ? setIsOpen(false) : setIsOpen(true);
  };
  return(
    <fieldset className={styles['fieldset-tags']}>
      <ul>
        <button
          className={styles['fieldset-element']}
          onClick={handleTagsDropDown}
        >
          {tagName}<img src='images/arrow-right.svg' alt='' />
        </button>
        { isOpen &&
          array.map((tag, key) =>
            <li className={styles['fieldset-element']} key={key}>
              <label htmlFor={tag}>
                {tag}
              </label>
              <input 
                className={styles['fieldset-element']}
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

function FieldsetDate({ min, max, label }: FieldsetDate) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<any>(null);
  const getPercent = useCallback((value: number) => 
    Math.round(((value - min) / (max - min)) * 100), [min, max]
  );
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }}, [minVal, getPercent]);
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }}, [maxVal, getPercent]);

  const minThumbHandler = (event: eventHandler) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
  };
  const maxThumbHandler = (event: eventHandler) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
  };
  return (
    <fieldset className={styles['fieldset-date']}>
      <label htmlFor={label}>{label}</label>
      <div className={styles['input-container']}>
        <div className={`${styles['value']}`}>{minVal}</div>
        <div className={styles['slider']}>
          <input
            id={label}
            type='range'
            min={min}
            max={max}
            value={minVal}
            onChange={minThumbHandler}
            style={{ zIndex: (minVal > max - 100) ? '5' : 'unset' }}
          />
          <input
            id={label}
            type='range'
            min={min}
            max={max}
            value={maxVal}
            onChange={maxThumbHandler}
          />
        </div>
        <div className={`${styles['value']}`}>{maxVal}</div>
      </div>
    </fieldset>
  );
};

export { FieldsetSeason, FieldsetViewed, FieldsetTags, FieldsetDate };