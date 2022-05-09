import ButtonActions from 'components/Buttons/ButtonActions';
import Input from 'components/Input/Input';
import styles from './Connection.module.scss';

function Connection() {
  return (
    <div className={styles.container}> 
      <Input label="Nom d'utilisateur" name='username' type='text' placeholder='Entrez votre nom d’utilisateur'/>
      <Input label='Mot de passe' name='password' type='text' placeholder='Entrez votre mot de passe'/>
      <ButtonActions state='full'>Se connecter</ButtonActions>
    </div>
  );
}

export default Connection;