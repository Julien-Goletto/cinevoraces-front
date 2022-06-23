import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { 
  periodeBaseValues, 
  periodeStateValues, 
  setPeriodeMinVal, 
  setPeriodeMaxVal } from 'redux/slices/filter';
import styles from './DropDownMenu.module.scss';

/**
 * @return            list of radio inputs
 * @param   array     array of tags
 * @param   label     name tag, return a \<label\>
 * @param   handler   input handler
 */
function FieldsetRadio({array, label, handler}: FieldsetRadio) {
  return(
    <fieldset className={styles['fieldset']}>
      <ul>
        { array.map(({name, value, isChecked}, key) => 
          <li key={key}>
            <label>
              {name}
              <input
                className={styles['fieldset-element']}
                type='radio'
                value={value}
                name={label}
                onChange={handler}
                defaultChecked={isChecked}
              />
            </label>
          </li>
        )}
      </ul>
    </fieldset>
  );
}

/**
 * @return            list of checkbox inputs
 * @param   array     array of tags
 * @param   tagName   name of tags categorie, return a \<label\>
 * @param   handler   input handler
 */
function FieldsetCheckbox({ array, tagName, handler }: FieldsetCheckbox) {
  const [isOpen, setIsOpen] = useState(false);
  const handleTagsDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
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
          {tagName}<img src='/images/arrow-right.svg' alt='' />
        </button>
        { isOpen &&
          array.map(({name, isChecked}, key) =>
            <li className={styles['fieldset-element']} key={key}>
              <label htmlFor={name}>
                {name}
              </label>
              <input 
                className={styles['fieldset-element']}
                data-set={tagName}
                type='checkbox'
                value={name}
                id={name}
                onChange={handler}
                defaultChecked={isChecked}
              />
            </li>
          )}
      </ul>
    </fieldset>
  );
}

function FieldsetDate() {
  const [baseValueMin, baseValueMax]   = useAppSelector(periodeBaseValues);
  const [stateValueMin, stateValueMax] = useAppSelector(periodeStateValues);
  const dispatch = useAppDispatch();
  const minValRef = useRef(baseValueMin);
  const maxValRef = useRef(baseValueMax);
  const range = useRef<any>(null);

  const handleMinThumb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), stateValueMax - 1);
    dispatch(setPeriodeMinVal(value));
    minValRef.current = value;
  };
  const handleMaxThumb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), stateValueMin + 1);
    dispatch(setPeriodeMaxVal(value));
    maxValRef.current = value;
  };
  const getPercent = useCallback((value: number) => 
    Math.round(((value - baseValueMin) / (baseValueMax - baseValueMin)) * 100), [baseValueMin, baseValueMax]
  );

  useEffect(() => {
    const minPercent = getPercent(stateValueMin);
    const maxPercent = getPercent(maxValRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }}, [stateValueMin, getPercent]);
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(stateValueMax);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }}, [stateValueMax, getPercent]);

  return (
    <fieldset className={styles['fieldset-date']}>
      <label htmlFor='time'>Période</label>
      <div className={styles['input-container']}>
        <div className={`${styles['value']}`}>{stateValueMin}</div>
        <div className={styles['slider']}>
          <input
            id='time'
            type='range'
            min={baseValueMin}
            max={baseValueMax}
            value={stateValueMin}
            onChange={handleMinThumb}
            style={{ zIndex: (stateValueMin > baseValueMax - 100) ? '5' : 'unset' }}
          />
          <input
            id='time'
            type='range'
            min={baseValueMin}
            max={baseValueMax}
            value={stateValueMax}
            onChange={handleMaxThumb}
          />
        </div>
        <div className={`${styles['value']}`}>{stateValueMax}</div>
      </div>
    </fieldset>
  );
};

export { FieldsetRadio, FieldsetCheckbox, FieldsetDate };