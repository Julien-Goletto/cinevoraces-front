import Metrics from 'components/Metrics/Metrics';
import Input from 'components/Input/Input';
import { Button } from 'components/Buttons/Button';
import styles from './Register.module.scss';

function Register() {
  const sendFormHandler = () => {
    // TODO: code-me
  };

  return(
    <>
      <section className={styles.register}>
        <form className={styles.form}>
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
            handler={sendFormHandler}
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