import styles from './Avatar.module.scss';

type AvatarProps = {
  img: string | null | undefined,
  asInfo?: {
    username: string,
    date: string
  }}

function Avatar({img = undefined, asInfo}: AvatarProps) {
  const imgSrc = img ? img : '/images/user_default.svg';
  const date = asInfo? new Date(asInfo.date)
    .toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'}) : null;

  return(
    <div className={styles.user}>
      <img src={imgSrc} alt='Avatar'/>
      {asInfo &&
        <div className={styles.box}>
          <h5 className={styles.name}>{asInfo.username}</h5>
          <div className={styles.date}>{date}</div>
        </div>}
    </div>
  );
}

export default Avatar;