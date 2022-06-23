import useSeeMore from 'hooks/useSeeMore';
import { InputStar } from 'components/Inputs/InputsLib';
import styles from './Presentation.module.scss';

function Presentation({pic, name, date, text}: CommentProps) {
  const sliceText = useSeeMore(text, 700);

  return (
    <div className={styles.presentation}>
      <div className={styles.profil}>
        <div className={styles.picture}><img src={pic} alt='Avatar' className={styles.pic} /></div>
        <div className={styles.box}>
          <h5 className={styles.name}>{name}</h5>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      <div className={styles.note}><InputStar value={0}/></div>
      {sliceText}
    </div>
  );
};

export default Presentation;