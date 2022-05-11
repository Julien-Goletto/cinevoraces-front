import { Button } from 'components/Buttons/Button';
import Content from './Content';
import styles from './Film.module.scss';
import AddComment from './AddComment';
import Comment from './Comment';

function Film() {
  return (
    <section className={styles.film}>
      <Content />
      <AddComment />
      <Comment />
      <div className={styles.button}>
        <Button>
          Voir les commentaires (18)
        </Button>
      </div>
    </section>
  );
};

export default Film;