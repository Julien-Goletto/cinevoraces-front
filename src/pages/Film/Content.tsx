import Interactions from 'components/Interactions/Interactions';
import Description from './Description';
import styles from './Film.module.scss';

const fake_data: {[key:string]: string} =
  { 
    title: 'Jawas', 
    cover: 'fake_data/covers/cover_1.jpg',
  };

function Content() {
  return (
    <div className={styles.content}>
      <div className={styles.poster}><img src={fake_data.cover} alt={fake_data.title} className={styles.img} /></div>
      <div className={styles.interactions}>
        <Interactions type='bookmark' count={0}/>
        <Interactions type='view' count={0}/>
        <Interactions type='like' count={0}/>
        <Interactions type='star' count={0}/>
      </div>
      <Description />
    </div>
  );
};

export default Content;