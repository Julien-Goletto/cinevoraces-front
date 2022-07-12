import { ReactComponent as LinkedIn } from './About.linkedin.svg';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './About.module.scss';
import Footer from 'components/Layout/Footer';

function About() {
  const contributors = [
    {name: 'Julien GOLETTO', avatar: '/images/contributor_1.jpg', linkedin: 'https://www.linkedin.com/in/julien-goletto-a589a2203/'},
    {name: 'Gregory MICHALAK', avatar: '/images/contributor_2.png', linkedin: 'https://www.linkedin.com/in/gregory-michalak/'},
    {name: 'Anthony ESPIRAT', avatar: '/images/contributor_3.png', linkedin: 'https://www.linkedin.com/in/anthony-espirat/'},
    {name: 'Joffrey D\'ORTOLI', avatar: '/images/contributor_4.jpg', linkedin: 'https://www.linkedin.com/in/joffreydortoli/'},
    {name: 'Gino SALOME', avatar: '/images/contributor_5.jpg', linkedin: 'https://www.linkedin.com/in/gino-salom%C3%A9-0a10ba139/'}
  ];

  return (
    <AnimationLayout>
      <main className={styles.about}>
        <h1>L'équipe</h1>
        <div className={styles.contributors}>
          {contributors.map(({name, avatar, linkedin}) => (
            <div className={styles.card}>
              <img src={avatar} alt={name}/>
              <div className={styles.name}>{name}</div>
              <a href={linkedin} target={'_blank'} rel='noreferrer'>
                <LinkedIn/>
              </a>
            </div>))}
        </div>
      </main>
      <Footer/>
    </AnimationLayout>
  );
};

export default About;