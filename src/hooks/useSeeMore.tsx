import { useState } from 'react';
import styles from './useSeeMore.module.scss';

export default function useSeeMore(text:string, max:number = 500) {
  const textLenght = text.length;
  const [maxChar, setMaxChar] = useState<number>(max);
  const [see, setSee] = useState<string>('Voir plus');
  
  const seeMore = () => {
    if(maxChar <= max) {
      setMaxChar(textLenght);
      setSee('Voir moins');
    }
    else {
      setMaxChar(max);
      setSee('Voir plus');
    }
  };

  if(textLenght <= max) {
    return (
      <p className={styles.text}>{text}</p>
    );
  }
  return (
    <p className={styles.text}>{text.substring(0,maxChar)}
      <button onClick={() => {seeMore();}} className={styles.more}>{see}</button>
    </p>
  );

}