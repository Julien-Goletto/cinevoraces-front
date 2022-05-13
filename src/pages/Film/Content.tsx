import Interactions from 'components/Interactions/Interactions';
import Presentation from './Presentation';
import Description from './Description';
import styles from './Content.module.scss';

// C CASSE

function Content({ movie, isLoading }: Content) {
  if (!isLoading) {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            
            <div 
              className={styles.poster}
              key={movie.id}
            >
              <img 
                src={movie.poster_url} 
                alt={movie.french_title}
                className={styles.img} 
              />
            </div>
            
            <div className={styles.interactions}> 
              <Interactions type='bookmark' count={0}/>
              <Interactions type='view' count={0}/>
              <Interactions type='like' count={0}/>
              <Interactions type='star' count={0}/>
            </div>
          </div>
          <Description movie={movie} />
          <Presentation pic={'/fake_data/pictures/profilpic.png'} name={'Jean Cule'} date='7 janvier 2022'
            text={`Un grand merci à Wade pour cette proposition. C'est la deuxième fois que je le vois et, pour résumer, je l'ai trouvé encore plus puissant. Je vais essayer d'être pertinent et pas trop brouillon mais ce film m'a retourné donc je ne garantis pas la cohérence de cette "critique".
  
              L'avantage de revoir un film c'est qu'on évacue les grandes lignes du scénario et qu'on se focalise sur des détails passés inaperçus la première fois. Le film est servi par deux très grands acteurs. Et il n'en fallait pas moins pour sublimer la grande force de Jeff Nichols : faire avancer l'intrigue et transmettre des émotions par des silences et des regards. Les silences de Curtis dans la première partie du film d'abord, un Curtis qui sent son monde s'effondrer sous ses pieds à cause d'une menace dont il ne sait si elle est intérieure ou s'il est le seul à vraiment la discerner. C'est d'ailleurs une des forces du film : les visions se font de plus en plus angoissantes mais les explications rationnelles arrivent en écho (la maladie de se mère, la crise d'angoisse, l’irrationalité qui mènera au retard de traitement pour sa fille). Puis, dans la dernière demi-heure (grandiose), les silences et les regards se font, là aussi signifiants mais la famille y est associée. Lors du repas du Lion's Club notamment où deux regards se répondent : celui de Curtis qui semble crier à sa fille qu'il a peur pour elle, qu'il est sûrement fou mais qu'il l'aime et qu'il sera toujours là et celui de Samantha qui comprend et qui l'assure de son soutien. Bref, cette scène m'a anéanti.
              `} />
        </div>
      </>
    );
  } else return null;
};

export default Content;