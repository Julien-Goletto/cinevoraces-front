import Input from 'components/Input/Input';
import styles from './Connection.module.scss';

function Connection() {
  return (
    <div className={styles.container}> 
      <Input label="Nom d'utilisateur" name='username' type='text' placeholder='Entrez votre nom d’utilisateur'/>
      <Input label='Mot de passe' name='password' type='text' placeholder='Entrez votre mot de passe'/>
      <button style={{
        height: '2.75rem',
        width: '7.75rem',
        margin: 0,
        right: 0,
      }}
      >Se connecter</button>
    </div>
  );
}

export default Connection;