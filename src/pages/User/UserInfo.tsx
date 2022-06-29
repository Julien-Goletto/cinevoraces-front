import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addToast } from 'redux/slices/global';
import { useUserUpdateMutation } from 'redux/api';
import { userLogged } from 'redux/slices/user';
import { PictureField, Field } from './UserInfo.Field';
import styles from './UserInfo.module.scss';

function UserInfo() {
  const dispatch = useAppDispatch();
  const {id, avatar} = useAppSelector(userLogged);
  const [updateUser, {isError, isSuccess, reset, error}] = useUserUpdateMutation();
  // Controlled inputs states
  const [pseudo, setPseudo]             = useState('');
  const [mail, setMail]                 = useState('');
  const [password, setPassword]         = useState('');
  const [newPassword, setNewPassword]   = useState('');
  const [confirm, setConfirm]           = useState('');

  // Controlled states handlers
  const handlePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.currentTarget.value);
  };
  const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.currentTarget.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
  };
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.currentTarget.value);
  };
  // Resolve password errors
  const formRegEx = (string: string) => {
    if (RegExp(process.env.REACT_APP_PASS_REGEX!).test(String(string!))) { // eslint-disable-line
      return true;
    } else {
      return false;
    }};
  const dispatchToastError = (error: string) => {
    dispatch(addToast({type:'error', text: error}));
  };
  const sendFormHandler = async (field: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length === 0) {
      return dispatchToastError('Vous devez renseigner votre mot de passe.');
    }
    // Init body
    const body: {userId: number, user: {[key: string]: string}} = {
      userId: id!,
      user: {oldPassword: password}};

    // Resolve field
    switch (field) {
    case 'password':
      // handle errors
      if (confirm.length === 0) {
        return dispatchToastError('Vous devez confirmer votre mot de passe.');
      } else if (!formRegEx(password)) {
        return dispatchToastError('Votre mot de passe est invalide.');
      } else if (password !== confirm) {
        return dispatchToastError('Le mot de passe ne correspond pas au champ de confirmation.');
      }
      // update body
      body.user = {password: password, ...body.user};
      break;
    case 'pseudo':
      if (pseudo.length === 0) {
        return dispatchToastError('Vous devez indiquer un nom d\'utilisateur valide.');
      }
      body.user = {pseudo: pseudo, ...body.user};
      break;
    case 'mail':
      if (mail.length === 0) {
        return dispatchToastError('Vous devez indiquer une adresse email valide.');
      }
      body.user = {mail: mail, ...body.user};
      break;
    }
    await updateUser(body);
  };
  
  // Handle update success
  useEffect(()=> {
    if(isSuccess) {
      dispatch(addToast({type: 'success', text: 'Informations mises à jour avec succés.'}));
      reset();
    }},[isSuccess]);
  // Handle update errors
  useEffect(()=> {
    if(isError && 'status' in error!) {
      (error.status === 400) && dispatchToastError('Ce nom d\'utilisateur ou cette adresse mail n\'est pas disponible.');
    }},[isError]);

  return(
    <ul className={styles['user-params']}> 
      <PictureField
        avatar={avatar}
      />
      <Field
        name='mail'
        state={mail}
        handler={handleMail}
        placeholder='Entrez votre nouveau email'
      />
      <Field
        name='pseudo'
        state={pseudo}
        handler={handlePseudo}
        placeholder="Entrez votre nouveau nom d'utilisateur"
      />
      <Field
        name='password'
        state={password}
        handler={handlePassword}
        placeholder='Entrez votre nouveau mot de passe'
      />
      {/* <UserPicUploader
        avatar={avatar}
      />
      <UserParamField
        onSubmit={handleEmailSubmit}
        field='email'
        defaultValue={email}
        updateIsSuccess={updateIsSuccess}
      />
      <UserParamField
        onSubmit={handleUsernameSubmit}
        field='username'
        defaultValue={username}
        updateIsSuccess={updateIsSuccess}
      />
      <UserParamPasswordField
        onSubmit={handlePasswordSubmit}
        updateIsSuccess={updateIsSuccess}
      />         */}
    </ul>
  );
}

export default UserInfo;