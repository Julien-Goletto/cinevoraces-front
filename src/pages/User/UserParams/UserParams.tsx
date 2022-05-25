import { useState } from 'react';
import { Button } from 'components/Buttons/Button';
import { useAppDispatch } from 'redux/hooks';
import { addToast } from 'redux/slices/global';
import { useUserUpdateMutation } from 'redux/api';
import { useParams } from 'react-router-dom';

import Input from 'components/Input/Input';
import styles from './UserParams.module.scss';
import userStyles from '../User.module.scss';

function UserParams({ username, email }: user) {
  const [showInput, setShowInput] = useState(false);
  const dispatch = useAppDispatch();
  const { id }  = useParams();
  const [updateUser, {isSuccess, isError}] = useUserUpdateMutation();

  const handleShowInput = () => {
    setShowInput(true);
  };
  const formRegEx = (string: FormDataEntryValue) => {
    if (RegExp('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\-~!@#$%^*_+=/:;.?])(?=.{8,}))').test(String(string!))) { // eslint-disable-line
      return true;
    } else {
      return false;
    }
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updateRequest = {   
      user: {
        oldPassword: form.get('old-password'),
        pseudo: form.get('username'),
        mail: form.get('email'),
        password: form.get('new-password'),
        avatar_url: 'jambon',
        role: 'user'
      },
      confirmPassword: form.get('confirm-new-password'),
      userId: Number(id)
    };
    
    if (
      updateRequest.user.pseudo === '' || updateRequest.user.mail === '' || 
      updateRequest.user.oldPassword === '' || updateRequest.user.password === '' || 
      updateRequest.confirmPassword === '' 
    ) {
      dispatch(addToast({type:'error', text: 'Vous devez remplir tout les champs'}));
    } else if (!formRegEx(updateRequest.user.password!)) {
      dispatch(addToast({type:'error', text: 'Votre nouveau mot de passe est invalide'}));
    } else if (updateRequest.user.password !== updateRequest.confirmPassword) {
      dispatch(addToast({type:'error', text: 'Votre nouveau mot de passe ne correspond pas au mot de passe de confirmation'}));
    } else {
      updateUser(updateRequest);
      isError && dispatch(addToast({type:'error', text: 'Mot de passe, adresse mail ou nom d\'utilisateur incorrect'}));
      isSuccess && dispatch(addToast({type:'success', text: 'Vos informations ont bien été mises à jour'}));
    }
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
          value={email}
        />
        <Input
          name='username'
          type='text'
          placeholder='Entrez votre nouveau nom d’utilisateur'
          value={username}
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
        <div className={styles.rules}>
          Votre mot de passe doit contenir au moins une majuscule, une minuscule, un symbôle et un chiffre et doit contenir au moins 8 caractères.
        </div>
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