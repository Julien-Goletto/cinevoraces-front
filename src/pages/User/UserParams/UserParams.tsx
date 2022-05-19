import { useState } from 'react';
import { Button } from 'components/Buttons/Button';
import { useAppDispatch } from 'redux/hooks';
import { addToast } from 'redux/slices/global';

import Input from 'components/Input/Input';
import styles from './UserParams.module.scss';
import userStyles from '../User.module.scss';

function UserParams({ username, email }: user) {
  const [showInput, setShowInput] = useState(false);
  const dispatch = useAppDispatch();

  const handleShowInput = () => {
    setShowInput(true);
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const UpdateRequest = {      
      pseudo: form.get('username'),
      mail: form.get('email'),
      password: form.get('new-password'),
      confirmPassword: form.get('confirm-new-password'),
      oldPassword: form.get('old-password')
    };   
    console.log(UpdateRequest);
    dispatch(addToast({type:'error', text: 'Vous devez remplir tout les champs'}));
    dispatch(addToast({type:'error', text: 'Votre nouveau mot de passe ne correspond pas au mot de passe de confirmation'}));
    dispatch(addToast({type:'error', text: 'Votre mot de passe actuel ne correspond pas'}));
    dispatch(addToast({type:'error', text: 'Ce nom d\'utilisateur n\'est pas disponible'}));
    dispatch(addToast({type:'error', text: 'Cette adresse email est déjà associée à un compte'}));
    dispatch(addToast({type:'success', text: 'Vos informations ont bien été mises à jour'}));
  };

  return(
    <form 
      className={styles['user-params']}
      onSubmit={handleFormSubmit}
    >
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
    </form>
  );
}

export default UserParams;