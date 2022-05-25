import { Button } from 'components/Buttons/Button';
import styles from './Admin.module.scss';
import Proposal from './Proposal';
import User from './User';

const fake_data = {
  movie: {
    french_title: 'Garfield the movie (2077)',
    publishing_date: '2022-06-01',
    user_pseudo: 'PrincessJambon58',
    presentation: 'Bonjour, voici le chat le plus drôle du monde. En plus il aime les lasagnes, comme moi !'
  },
  user: {
    pseudo: 'Joffrey d\'Ortoli',
    mail: 'joffrey@mail.net',
    role: 'user',
    created_at: '2022-05-25'
  }
};

function Admin () {
  return(
    <section className={styles['admin-panel']}>
      <form className={styles['proposal-form']}>
        <div className={styles['proposals-container']}>
          <Proposal
            movie={fake_data.movie}
          ></Proposal>
          <Proposal
            movie={fake_data.movie}
          ></Proposal>
          <Proposal
            movie={fake_data.movie}
          ></Proposal>
          <Proposal
            movie={fake_data.movie}
          ></Proposal>
          <Proposal
            movie={fake_data.movie}
          ></Proposal>
          <Proposal
            movie={fake_data.movie}
          ></Proposal>
        </div>
        <div className={styles['button-container']}>        
          <Button
            styleMod='rounded-fill'
          >Publier</Button>
          <Button
            styleMod='rounded-fill'
          >Supprimer</Button></div>
      </form>
      <form className={styles['user-form']}>
        <div>
          <table>
            <thead>
              <tr>
                <th className={styles['table-case']}>Username</th>
                <th className={styles['table-case']}>Email</th>
                <th className={styles['table-case']}>Rôle</th>
                <th className={styles['table-case']}>Date de création</th>
                <th className={styles['table-case']} colSpan={2}>Interaction</th>
              </tr>
            </thead>
            <tbody>
              <User
                user={fake_data.user}
              >
              </User>
              <User
                user={fake_data.user}
              >
              </User>
              <User
                user={fake_data.user}
              >
              </User>
              <User
                user={fake_data.user}
              >
              </User>
              <User
                user={fake_data.user}
              >
              </User>
            </tbody>
              
          </table>
        </div>
      </form>
    </section>
  );
};

export default Admin;