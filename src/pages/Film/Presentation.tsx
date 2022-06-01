import styles from './Presentation.module.scss';
import StarRating from 'components/StarRating/StarRating';
import useSeeMore from 'hooks/useSeeMore';

function Presentation({pic, name, date, text}: CommentProps) {
  const sliceText = useSeeMore(text, 700);

  return (
    <div className={styles.presentation}>
      <div className={styles.profil}>
        <img src={(pic) ? pic : '/images/user_default.svg'} alt='Avatar' className={styles.pic} />
        <div className={styles.box}>
          <h5 className={styles.name}>{name}</h5>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      {/* <div className={styles.note}><StarRating/></div> */}
      {sliceText}
    </div>
  );
};

export default Presentation;