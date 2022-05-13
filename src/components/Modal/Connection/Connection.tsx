import { Button } from 'components/Buttons/Button';
import Input from 'components/Input/Input';
import { useAppDispatch } from 'redux/hooks';
import { useUserLoginMutation } from 'redux/api';
import { toggleConnection } from 'redux/slices/global';
import styles from './Connection.module.scss';
import { setUser } from 'redux/slices/user';
import { useEffect } from 'react';

function Connection() {
  const [loginUser, {data, error, isError, isSuccess}] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const sendForm = async (e:any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const user = {      
      pseudo: form.get('username'),
      mail: 'dadaz@lol.fr',
      password: form.get('password')
    };   
    loginUser(user);
  };

  useEffect(()=> {
    if(isSuccess) {
      dispatch(setUser(data));
      dispatch(toggleConnection());
    }
    if(isError) {
      console.log(error);
    }
  },[data, isError, isSuccess, dispatch, error]);

  
  return (
    <div className={styles.container}> 
      <button className={styles.close} onClick={() => dispatch(toggleConnection())}>X</button>
      <form onSubmit={sendForm}>
        <Input label="Nom d'utilisateur" name='username' type='text' placeholder='Entrez votre nom d’utilisateur'/>
        <Input label='Mot de passe' name='password' type='password' placeholder='Entrez votre mot de passe'/>
        <div className={styles.button}>
          <Button 
            styleMod='fill'
          >
            Se connecter
          </Button>
        </div>
      </form>

    </div>
  );
}

export default Connection;