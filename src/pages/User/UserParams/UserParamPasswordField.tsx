import { useState } from 'react';
import { Button } from 'components/Buttons/Button';
import Input from 'components/Input/Input';
import styles from './UserParams.module.scss';
import userStyles from '../User.module.scss';

function UserParamPasswordField () {
  const [showInput, setShowInput] = useState(false);
  const handleShowInput = (e: any) => { 
    e.preventDefault();
    setShowInput(!showInput);
  };

  return(
    <>
      { !showInput &&
        <div className={styles['field']}>
          <div className={userStyles['title-h4']}>
            <span>mot de passe :</span>
            <span className={styles['info']}>&nbsp;**********</span>
          </div>
          <Button 
            handler={handleShowInput}
            styleMod='fill-rounded'
          >
            Modifier
          </Button>
        </div>
      }
      { showInput &&
        <div className={styles['field']}>
          <div className={styles['input']}>
            {/* <label 
              className={styles['rules']}
              htmlFor={field}
            >
              Entrez votre nouveau mot de passe :
            </label> */}
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
            <div className={styles.rules}>
              Votre mot de passe doit contenir au moins une majuscule, une minuscule, un symbôle et un chiffre et doit contenir au moins 8 caractères.
            </div>
            <Input
              name='old-password'
              type='password'
              placeholder='Entrez votre mot de passe'
            />
          </div>
          <div className={styles['buttons']}>
            <Button 
              handler={handleShowInput}
              styleMod='fill-rounded'
            >
              Annuler
            </Button>
            <Button
              styleMod='fill-rounded'
            >
              <img src='/images/send-icon.svg' alt='' />
              Valider
            </Button>
          </div>
        </div>
      }
    </>
  );
}

export default UserParamPasswordField;