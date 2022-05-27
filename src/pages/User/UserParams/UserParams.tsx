import { useAppDispatch } from 'redux/hooks';
import { addToast } from 'redux/slices/global';
import { useUserUpdateMutation } from 'redux/api';
import { useParams } from 'react-router-dom';

import UserParamField from './UserParamField';
import UserParamPasswordField from './UserParamPasswordField';
import UserPicUploader from './UserPicUploader';
import styles from './UserParams.module.scss';

function UserParams({ username, email, avatar }: user) {
  const dispatch = useAppDispatch();
  const { id }  = useParams();
  const [updateUser, {isSuccess, isError}] = useUserUpdateMutation();

  const formRegEx = (string: FormDataEntryValue) => {
    if (RegExp('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\-~!@#$%^*_+=/:;.?])(?=.{8,}))').test(String(string!))) { // eslint-disable-line
      return true;
    } else {
      return false;
    }
  };
  const handleEmailSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updateRequest = { 
      user: { oldPassword: form.get('old-password'), mail: form.get('email') },
      userId: Number(id) 
    };
    if (updateRequest.user.oldPassword === '') {
      dispatch(addToast({type:'error', text: 'Vous devez renseigner votre mot de passe.'}));
    } else {
      updateUser(updateRequest);
    }};
  const handleUsernameSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updateRequest = {   
      user: { oldPassword: form.get('old-password'), pseudo: form.get('username')},
      userId: Number(id)
    };    
    if (updateRequest.user.oldPassword === '') {
      dispatch(addToast({type:'error', text: 'Vous devez renseigner votre mot de passe.'}));
    } else {
      updateUser(updateRequest);
    }};
  const handlePasswordSubmit = (e: any) => {
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
    
    if (!formRegEx(updateRequest.user.password!)) {
      dispatch(addToast({type:'error', text: 'Votre nouveau mot de passe est invalide'}));
    } else if (updateRequest.user.password !== updateRequest.confirmPassword) {
      dispatch(addToast({type:'error', text: 'Votre nouveau mot de passe ne correspond pas au mot de passe de confirmation'}));
    } else if (updateRequest.user.oldPassword === '') {
      dispatch(addToast({type:'error', text: 'Vous devez renseigner votre mot de passe.'}));
    } else {
      updateUser(updateRequest);
    }};
  return(
    <div className={styles['user-params']}> 
      <UserPicUploader
        avatar={avatar}
      />
      <UserParamField
        onSubmit={handleEmailSubmit}
        field='email'
        defaultValue={email}
      />
      <UserParamField
        onSubmit={handleUsernameSubmit}
        field='username'
        defaultValue={username}
      />
      <UserParamPasswordField/>        
    </div>
  );
}

export default UserParams;