import React from 'react';
import styles from './InputStar.module.scss';

type InputStarProps = {
  isInput?: boolean,
  value: number,
  setter?: (arg: number) => void,
}

/**
 * @param value     state value, required
 * @param isInput   return \<div> if false
 * @param setter    setter function (only for input)
 */
function InputStar ({isInput, value, setter}: InputStarProps) {
  // Create radio inputs index (reversed is CSS related)
  const array: number[] = [5,4,3,2,1];      
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setter!(Number(e.currentTarget.value));
  }; 

  return(
    <div className={styles['input-star']}>
      {isInput &&
        // Interactive version
        array.map(el => (
          <input
            className={styles.input}
            type='radio'
            value={el}
            key={el}
            name='input-star'
            onChange={handleOnChange}
            defaultChecked={(value === el) ? true : false}
          />
        ))}
      {!isInput &&
        // Fixed version
        array.map(el => (
          <div 
            key={el}
            className={(el > value) ? styles.star : `${styles.star} ${styles['star--checked']}`}></div>
        ))}
    </div>
  );
}

export default InputStar;