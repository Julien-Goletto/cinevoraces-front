import Loader from 'components/Loader/Loader';
import { Button, InputText } from 'components/Inputs/InputsLib';
import { useAppDispatch } from 'redux/hooks';
import { useUserLoginMutation } from 'redux/api';
import { addToast, toggleModal } from 'redux/slices/global';
import { setUser } from 'redux/slices/user';
import { useEffect } from 'react';
import styles from './Connection.module.scss';

/**
 * @returns Connection form
 */
function Connection() {
  const [loginUser, {data: userData, isSuccess, isLoading}] = useUserLoginMutation();
  const dispatch = useAppDispatch();

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = {      
      pseudo: form.get('username'),
      password: form.get('password')
    };   
    loginUser(user);
  };
  const handleModal = () => {
    dispatch(toggleModal());
  };

  useEffect(()=> {
    if(isSuccess) {
      dispatch(setUser(userData));
      dispatch(toggleModal());
      dispatch(addToast({type:'success', text: `Bienvenue ${userData!.pseudo}`}));
    }
  }, [userData, isSuccess, dispatch]);

  
  return (
    <> 
      { isLoading &&
        <Loader isMaxed/>}
      <form className={styles.connection} onSubmit={sendForm}>
        <InputText label="Nom d'utilisateur" name='username' type='text' placeholder='Entrez votre nom d’utilisateur'/>
        <InputText label='Mot de passe' name='password' type='password' placeholder='Entrez votre mot de passe'/>
        <div className={styles['button-container']}>
          <Button styleMod='fill'>
            Se connecter
          </Button>
          <Button href='/register' handler={handleModal}>
            S'inscrire
          </Button>
        </div>
      </form>
    </>
  );
}

export default Connection;