import { ReactComponent as SVGLinkedIn } from './About.ico_linkedin.svg';
import { ReactComponent as SVGGit } from './About.ico_git.svg';
import { ReactComponent as SVGWeb } from './About.ico_web.svg';
import { Button } from 'components/Inputs/InputsLib';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import Footer from 'components/Layout/Footer';
import Avatar from 'components/Avatar/Avatar';
import styles from './About.module.scss';

type ListProps = {
  children: React.ReactNode
}
type LiProps = {
  imgSrc: string,
  name: string,
  pseudo?: string,
  roles: string[],
  links: {svg: JSX.Element, link: string}[],
  contributions: string[]
}

function About() {
  const owners = [
    {
      name: 'Julien GOLETTO',
      imgSrc: '/images/contributor_1.png',
      roles: ['Propriétaire', 'Dev front & back'],
      links: [
        {svg: <SVGLinkedIn/>, link:'https://www.linkedin.com/in/julien-goletto-a589a2203/'}
      ],
      contributions: ['RefreshToken de ses morts', 'Casser le back']
    },
    {
      name: 'Benoit Safari', 
      pseudo: 'Gregory MICHALAK',
      imgSrc: '/images/contributor_2.png',
      roles: ['Dev front'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/gregory-michalak/'},
        {svg: <SVGGit/>, link: 'https://github.com/BenoitSafari'},
        {svg: <SVGWeb/>, link: 'https://benoitsafari.com'}
      ],
      contributions: ['Tout le front']
      // Management dépôt git front', 'Filtrage des films', 'Page Films
    },
    {
      name: 'Anthony ESPIRAT',
      imgSrc: '/images/contributor_3.png',
      roles: ['Dev front', 'Designer'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/anthony-espirat/'},
        {svg: <SVGGit/>, link: 'https://github.com/anthonyespirat'},
        {svg: <SVGWeb/>, link: 'https://e-anthony.fr/'}
      ],
      contributions: ['Design du site', 'Integration', 'Systeme d\'authentification', 'Toast', 'debug']
    },
    {
      name: 'Joffrey D\'ORTOLI',
      imgSrc: '/images/contributor_4.jpg',
      roles: ['Dev back'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/joffreydortoli/'},
      ],
      contributions: ['Dénichage de pathé', 'Previens de l\'heure de l\'apero']

    },
    {
      name: 'Gino SALOME',
      imgSrc: '/images/contributor_5.jpg',
      roles: ['Dev front'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/gino-salom%C3%A9-0a10ba139/'},
      ],
      contributions: ['Mais il est où Gino?']
    }
  ];
  const contributors = [
    {
      name: 'Disco Blitzkrieg',
      imgSrc: '/images/contributor_6.jpg',
      roles: ['Graphiste'],
      links: [],
      contributions: ['Icône page d\'erreur']
    }
  ];

  return (
    <AnimationLayout>
      <main className={styles.about}>
        <div className={styles.presentation}>
          <h1>À propos de CinéVoraces</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias earum hic. Asperiores suscipit commodi, dolorem voluptatum fuga, quas et accusamus eum reiciendis sed doloribus amet, perspiciatis enim ipsum excepturi?
          </p>
          <p>
            <em>CinéVoraces</em> et son code source sont la propriété intellectuelle de ses créateurs, il est cependant possible de consulter/copier le code source tant qu'il ne <em>s'agit pas d'un usage commercial</em>.
          </p>
          <div className={styles.links}>
            <Button href={'https://github.com/Julien-Goletto/cinevoraces-front'}>Consulter le dépôt GitHub Front</Button>
            <Button href={'https://github.com/Julien-Goletto/cinevoraces-back'}>Consulter le dépôt GitHub Back</Button>
          </div>
        </div>
        <h2>Les contributeurs</h2>
        <h3>À l'origine du projet</h3>
        <List>
          {owners.map(owner => (
            <Li {...owner}/>))}
        </List>
        <h3>Nous ont rejoint</h3>
        <List>
          {contributors.map(contributor => (
            <Li {...contributor}/>))}
        </List>
      </main>
      <Footer/>
    </AnimationLayout>
  );
};

function List({children}: ListProps) {
  return(
    <ul className={styles.contributors}>
      {children}
    </ul>
  );
}

function Li(props: LiProps) {
  const {imgSrc, name, pseudo, roles, links, contributions} = props;
  return(
    <li className={styles.card}>
      <div className={styles.row}>
        <div className={styles.col}>
          <strong><em>{name}</em></strong>
          {pseudo && 
            <span className={styles.pseudo}>{pseudo}</span>}
          {roles.map(role =>(
            <span>{role}</span>))}
          <div className={`${styles.row} ${styles['row--links']}`}>
            {links.map(({svg, link}) => (
              <a href={link} target={'_blank'} rel='noreferrer'>
                {svg}
              </a>
            ))}
          </div>
        </div>
        <Avatar img={imgSrc}/>
      </div>
      <strong>Contributions</strong>
      <div className={styles.col}>
        <ul className={styles.col}>
          {contributions.map(contribution => (
            <li>{contribution}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default About;