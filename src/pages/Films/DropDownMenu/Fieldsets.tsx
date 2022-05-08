import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styles from './DropDownMenu.module.scss';

function FieldsetRadio({array, handler}: FieldsetRadio) {
  return(
    <fieldset className={styles['fieldset']}>
      <ul>
        { array.map((item, key) => 
          <li key={key}>
            <label>
              {item.name}
              <input
                className={styles['fieldset-element']}
                type='radio'
                value={item.value}
                name='season'
                onChange={handler}
              />
            </label>
          </li>
        )}
      </ul>
    </fieldset>
  );
}

function FieldsetCheckbox({ array, tagName, handler }: FieldsetCheckbox) {
  const [isOpen, setIsOpen] = useState(false);
  const handleTagsDropDown = (e:mouseEvent) => {
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
          array.map(({name, isChecked}, key) =>
            <li className={styles['fieldset-element']} key={key}>
              <label htmlFor={name}>
                {name}
              </label>
              <input 
                className={styles['fieldset-element']}
                type='checkbox'
                value={name}
                id={name}
                onChange={handler}
              />
            </li>
          )}
      </ul>
    </fieldset>
  );
}

function FieldsetDate() {
  const [min, max] = useAppSelector((state) => state.filter.periode.isBetween);

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

  const minThumbHandler = (event: onChangeEvent) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
  };
  const maxThumbHandler = (event: onChangeEvent) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
  };
  return (
    <fieldset className={styles['fieldset-date']}>
      <label htmlFor='time'>Période</label>
      <div className={styles['input-container']}>
        <div className={`${styles['value']}`}>{minVal}</div>
        <div className={styles['slider']}>
          <input
            id='time'
            type='range'
            min={min}
            max={max}
            value={minVal}
            onChange={minThumbHandler}
            style={{ zIndex: (minVal > max - 100) ? '5' : 'unset' }}
          />
          <input
            id='time'
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

export { FieldsetRadio, FieldsetCheckbox, FieldsetDate };