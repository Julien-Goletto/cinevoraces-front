import { useState } from 'react';
import { Button } from 'components/Buttons/Button';
import Input from 'components/Input/Input';
import styles from './UserParams.module.scss';
import userStyles from '../User.module.scss';

function UserParams({ username, email }: user) {
  const [showInput, setShowInput] = useState(false);
  const handleShowInput = () => {
    setShowInput(true);
  };
  return(
    <div className={styles['user-params']}>
      { showInput &&
      <>
        <div className={styles['action']}>
          Changes mes identifiants
        </div>
        <Input
          name='email'
          type='email'
          placeholder='Entrez votre nouveau email'
        />
        <Input
          name='username'
          type='text'
          placeholder='Entrez votre nouveau nom d’utilisateur'
        />
        <div className={styles['action']}>
          Changes mes identifiants
        </div>
        <Input
          name='old-password'
          type='password'
          placeholder='Ancien mot de passe'
        />
        <Input
          name='new-password'
          type='password'
          placeholder='Nouveau mot de passe'
        />
        <Input
          name='confirm-new-password'
          type='password'
          placeholder='Confirmez votre nouveau mot de passe'
        />
        <Button
          styleMod='fill-rounded'
        >
          <img src='/images/send-icon.svg' alt='' />
          Envoyer
        </Button>
      </>
      }
      { !showInput &&
        <>
          <div className={styles['user-info']}>
            <h4 className={userStyles['title-h4']}>
              <span>email :</span>
              <span className={styles['info']}>&nbsp;{email}</span>
            </h4>
            <h4 className={userStyles['title-h4']}>
              <span>nom :</span>
              <span className={styles['info']}>&nbsp;{username}</span>
            </h4>
            <h4 className={userStyles['title-h4']}>
              <span>mot de passe :</span>
              <span className={styles['info']}>&nbsp;**********</span>
            </h4>

          </div>
          <Button
            styleMod='fill'
            handler={handleShowInput}
          >
            Modifier mes paramètres
          </Button>
        </>
      }
      

    </div>
  );
}

export default UserParams;