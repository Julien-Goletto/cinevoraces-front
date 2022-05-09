import ButtonActions from 'components/Buttons/ButtonActions';
import Input from 'components/Input/Input';
import { useAppDispatch } from 'redux/hooks';
import { toggleConnection } from 'redux/slices/global';
import styles from './Connection.module.scss';

function Connection() {

  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}> 
      <button className={styles.close} onClick={() => dispatch(toggleConnection())}>X</button>
      <Input label="Nom d'utilisateur" name='username' type='text' placeholder='Entrez votre nom d’utilisateur'/>
      <Input label='Mot de passe' name='password' type='text' placeholder='Entrez votre mot de passe'/>
      <div className={styles.button}>
        <ButtonActions state='full'>Se connecter</ButtonActions>
      </div>
    </div>
  );
}

export default Connection;