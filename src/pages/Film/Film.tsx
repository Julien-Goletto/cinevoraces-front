import Button from 'components/Buttons/Button';
import Presentation from './Presentation';
import Content from './Content';
import Description from './Description';
import styles from './Film.module.scss';
import AddComment from './AddComment';
import Comment from './Comment';

function Film() {
  return (
    <section className={`${styles.movie} container`}>
      <Content />
      <Description />
      <Presentation />
      <AddComment />
      <Comment />
      <div className={styles.button}>
        <Button state='empty'>Voir les commentaires (18)</Button>
      </div>
    </section>
  );
};

export default Film;