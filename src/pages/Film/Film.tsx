import { Button } from 'components/Buttons/Button';
import Content from './Content';
import styles from './Film.module.scss';
import Comment from './Comment';
import fake_data from './fakedata.js';


function Film() {
  return (
    <section className={styles.film}>
      <Content />
      <h3 className={styles['title']}>Commentaires (18)</h3>
      <div className={styles.comments}>
        {fake_data.map((el) => (
          <Comment pic={el.pic} name={el.name} date={el.date} text={el.text} edit={el.edit}   />
        ))}

      </div>
      
      <div className={styles.button}>
        <Button>
          Voir les commentaires (18)
        </Button>
      </div>
    </section>
  );
};

export default Film;