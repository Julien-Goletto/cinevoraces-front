import Metrics from 'components/Metrics/Metrics';
import Input from 'components/Input/Input';
import { Button } from 'components/Buttons/Button';
import styles from './Register.module.scss';
import { useUserRegisterMutation } from 'redux/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  let navigate = useNavigate();
  const [addUser, {isLoading, isError}] = useUserRegisterMutation();
  const sendFormHandler = async (e:any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = {
      pseudo: data.get('username'),
      mail: data.get('email'),
      password: data.get('password')
    };
    const res = await addUser(user);
    console.log(res);
    if(!isError) {
      return navigate('/');
    }
  };


  return(
    <>
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

          <Button
            styleMod='fill-rounded'
          >
            <img src='images/send-icon.svg' alt='' />
            Envoyer
          </Button>
        </form>
        <img className={styles.img} src='images/register-img.png' alt='' />
      </section>
      <Metrics/>
    </>
  );
}

export default Register;