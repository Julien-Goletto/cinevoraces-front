import ButtonActions from 'components/Buttons/ButtonActions';
import Input from 'components/Input/Input';
import { useAppDispatch } from 'redux/hooks';
import { toggleConnection } from 'redux/slices/global';
import styles from './Connection.module.scss';

function Connection() {

  const dispatch = useAppDispatch();
  const sendForm = (e:any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const user = {
      username: form.get('username'),
      password: form.get('password')
    };    
  };

  return (
    <div className={styles.container}> 
      <button className={styles.close} onClick={() => dispatch(toggleConnection())}>X</button>
      <form onSubmit={sendForm}>
        <Input label="Nom d'utilisateur" name='username' type='text' placeholder='Entrez votre nom d’utilisateur'/>
        <Input label='Mot de passe' name='password' type='password' placeholder='Entrez votre mot de passe'/>
        <div className={styles.button}>
          <ButtonActions state='full'>Se connecter</ButtonActions>
        </div>
      </form>

    </div>
  );
}

export default Connection;