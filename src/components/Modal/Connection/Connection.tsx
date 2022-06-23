import Loader from 'components/Loader/Loader';
import { Button, InputText } from 'components/Inputs/InputsLib';
import { useAppDispatch } from 'redux/hooks';
import { useUserLoginMutation } from 'redux/api';
import { addToast, toggleConnection } from 'redux/slices/global';
import { setUser } from 'redux/slices/user';
import { useEffect } from 'react';
import styles from './Connection.module.scss';

function Connection() {
  const [loginUser, {data, error, isError, isSuccess, isLoading}] = useUserLoginMutation();
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
      dispatch(addToast({type:'success', text: `Bienvenue ${data && data.pseudo}`}));
    }
    if(isError) {
      dispatch(addToast({type:'error', text: 'Mauvais identifiant ou mot de passe'}));
    }
  },[data, isError, isSuccess, dispatch, error, isLoading]);

  
  return (
    <div className={styles.container}> 
      { isLoading &&
        <Loader isMaxed={true}/>
      }
      <button className={styles.close} onClick={() => dispatch(toggleConnection())}>X</button>
      <form onSubmit={sendForm}>
        <InputText label="Nom d'utilisateur" name='username' type='text' placeholder='Entrez votre nom d’utilisateur'/>
        <InputText label='Mot de passe' name='password' type='password' placeholder='Entrez votre mot de passe'/>
        <div className={styles.button}>
          <Button 
            styleMod='fill'
          >
            Se connecter
          </Button>
          <Button 
            href='/register'
            handler={() => dispatch(toggleConnection())}
            // styleMod='fill'
          >
            S'inscrire
          </Button>
        </div>
      </form>

    </div>
  );
}

export default Connection;