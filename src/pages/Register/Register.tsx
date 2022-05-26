import Metrics from 'components/Metrics/Metrics';
import Loader from 'components/Loader/Loader';
import Input from 'components/Input/Input';
import { Button } from 'components/Buttons/Button';
import styles from './Register.module.scss';
import { useEffect } from 'react';
import { useUserRegisterMutation } from 'redux/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userLogged, isOnline } from 'redux/slices/user';
import { addToast, toggleConnection } from 'redux/slices/global';

function Register() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector<boolean>(isOnline);
  const { id } = useAppSelector<any>(userLogged);
  const [addUser, {error, isLoading, isError, isSuccess}] = useUserRegisterMutation<any>();
  let navigate = useNavigate();
  isLogged && navigate(`/user/${id}`);

  const formRegEx = (string: FormDataEntryValue) => {
    if (RegExp('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\-~!@#$%^*_+=/:;.?])(?=.{8,}))').test(String(string!))) { // eslint-disable-line
      return true;
    } else {
      return false;
    }
  };
  const dispatchToastError = (error: string) => {
    dispatch(addToast({type:'error', text: error}));
  };
  const validateRequest = async (user: {[key: string]: FormDataEntryValue | null}) => {
    if (!user.mail) {
      dispatchToastError('Vous devez indiquer une adresse email valide.');
    } else if (!user.pseudo) {
      dispatchToastError('Vous devez indiquer un nom d\'utilisateur valide.');
    } else if (!user.password) {
      dispatchToastError('Vous devez définir un mot de passe.');
    } else if (!formRegEx(user.password)) {
      dispatchToastError('Votre mot de passe est invalide.');
    } else if (!user.confirm) {
      dispatchToastError('Vous devez confirmer votre mot de passe.');
    } else if (user.password !== user.confirm) {
      dispatchToastError('Le mot de passe ne correspond pas au champ de confirmation.');
    } else {
      delete user.confirm;
      const res = await addUser(user); // eslint-disable-line
    }
  };
  const sendFormHandler = async (e:any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = {
      pseudo: data.get('username'),
      mail: data.get('email'),
      password: data.get('password'),
      confirm: data.get('confirm'),
    };
    validateRequest(user);
  };
  useEffect(()=> {
    if(isSuccess) {
      dispatch(addToast({type:'success', text: 'Votre compte à été créé, vous pouvez vous connecter'}));
      dispatch(toggleConnection());
      return navigate('/');
    }
    if(isError) {
      (error.originalStatus === 400) && dispatch(addToast({type:'error', text: 'Ce nom d\'utilisateur ou cette adresse mail n\'est pas disponible.'}));
    }
  },[error, isLoading, isError, isSuccess, dispatch, navigate]);


  return(
    <>
      { isLoading &&
        <Loader isMaxed={true}/>
      }
      <section className={styles.register}>
        <form onSubmit={sendFormHandler} className={styles.form}>
          <h1 className={styles.title}>Créer un compte</h1>
          <Input
            label='Email'
            name='email'
            placeholder='Entrez votre email'
            type='email'
          />
          <Input
            label='Nom d’utilisateur'
            name='username'
            placeholder='Entrez votre nom d’utilisateur'
            type='text'
          />
          <Input
            label='Mot de passe'
            name='password'
            placeholder='Entrez votre mot de passe'
            type='password'
          />
          <Input
            name='confirm'
            placeholder='Confirmez votre mot de passe'
            type='password'
          />
          <div className={styles.rules}>
            Votre mot de passe doit contenir au moins une majuscule, une minuscule, un symbôle et un chiffre et doit contenir au moins 8 caractères.
          </div>

          <Button
            styleMod='fill-rounded'
          >
            <img src='/images/send-icon.svg' alt='' />
            Envoyer
          </Button>
        </form>
        <img className={styles.img} src='/images/register-img.png' alt='' />
      </section>
      <Metrics/>
    </>
  );
}

export default Register;