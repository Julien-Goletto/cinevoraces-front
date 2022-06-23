import { useState, useEffect } from 'react';
import { Button, InputText } from 'components/Inputs/InputsLib';
import styles from './UserParams.module.scss';
import userStyles from '../User.module.scss';

function UserParamPasswordField ({onSubmit, updateIsSuccess}: ParamPasswordField) {
  const [showInput, setShowInput] = useState(false);
  const handleShowInput = (e: any) => { 
    e.preventDefault();
    setShowInput(!showInput);
  };

  useEffect(() => {
    if (updateIsSuccess) {
      setShowInput(false);
    }
  }, [updateIsSuccess]);

  return(
    <form 
      className={styles['field']}
      onSubmit={onSubmit}
    >
      { !showInput &&
        <>
          <div className={userStyles['title-h4']}>
            <span>mot de passe :</span>
            <span className={styles['info']}>&nbsp;**********</span>
          </div>
          <div className={styles['modif-btn']}>
            <Button 
              handler={handleShowInput}
              styleMod='fill-rounded'
            >
              Modifier
            </Button>
          </div>
        </>
      }
      { showInput &&
        <>
          <div className={styles['input']}>
            <label 
              className={styles['rules']}
            >
              Entrez votre nouveau mot de passe :
            </label>
            <InputText
              name='new-password'
              type='password'
              placeholder='Nouveau mot de passe'
            />
            <InputText
              name='confirm-new-password'
              type='password'
              placeholder='Confirmez votre nouveau mot de passe'
            />
            <div className={styles.rules}>
              Votre mot de passe doit contenir au moins une majuscule, une minuscule, un symbôle et un chiffre et doit contenir au moins 8 caractères.
            </div>
            <InputText
              name='old-password'
              type='password'
              placeholder='Ancien mot de passe'
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
        </>
      }
    </form>
  );
}

export default UserParamPasswordField;