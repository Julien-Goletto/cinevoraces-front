import { Button, InputText } from 'components/Inputs/InputsLib';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserUpdatePictureMutation } from 'redux/api';
import Loader from 'components/Loader/Loader';
import styles from './UserInfo.module.scss';

type FieldProps = {
  type: string,
  state: string,
  password: string,
  confirm: string,
  fieldState: boolean,
  fieldSetter: React.MouseEventHandler,
  handler: React.ChangeEventHandler<HTMLInputElement>,
  value?: string
}

function Field({type, state, handler, value, password, confirm, fieldState, fieldSetter}: FieldProps) {
  const resolveTexts = () => {
    if (type === 'username') {
      return {
        placeholder: 'Jean-Roger',
        field: 'nom d’utilisateur:',
        label: 'Entrez votre nouveau nom d’utilisateur'
      }} // eslint-disable-line
    if (type === 'email') {
      return {
        placeholder: 'jean-roger@exemple.fr',
        field: 'email:',
        label: 'Entrez votre nouvelle adresse email'
      }} // eslint-disable-line
    if (type === 'password') {
      return {
        field: 'mot de passe:',
        label: 'Entrez votre nouveau mot de passe',
      }}} // eslint-disable-line
  const texts = resolveTexts();

  return (
    <fieldset className={styles.field}>
      {!fieldState &&
        <div className={styles['field-name']}>
          <span>{texts!.field}</span>&nbsp;{(value) ? value : '**********'}
        </div>}
      {fieldState &&
        <div className={styles['inputs-container']}>
          <InputText
            label={texts!.label}
            name={type}
            placeholder={(texts!.placeholder) ? texts!.placeholder : 'Nouveau mot de passe'}
            handler={handler}
            value={state}
            type={type}
          />
          {(type === 'password') &&
            <InputText
              name='confirm'
              placeholder='Confirmation'
              handler={handler}
              value={confirm}
              type='password'
            />
          }
          <InputText
            name='password'
            placeholder='Entrez votre mot de passe'
            handler={handler}
            value={password}
            type='password'
          />
        </div>}
      <div className={styles.buttons}>
        {!fieldState &&
          <Button handler={fieldSetter} styleMod='fill-rounded'>
            Modifier
          </Button>}
        {fieldState &&
        <>
          <Button styleMod='fill-rounded'>
            Valider
          </Button>
          <Button handler={fieldSetter} styleMod='fill-rounded'>
            Annuler
          </Button>
        </>}
      </div>
    </fieldset>  
  );
}

























function PictureField ({avatar}: {avatar: string}) {
  const {id}  = useParams();
  const [isUpdateOpen, setIsUpdateOpen]   = useState(false);
  const [imageFormData, setImageFormData] = useState<any>('');
  const [preview, setPreview]             = useState<any>(undefined);
  const [updateUserPicture, {isLoading}]  = useUserUpdatePictureMutation();

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('picture', imageFormData, imageFormData.name);
    const data = {userId: id, form: formData};
    updateUserPicture(data);
    setIsUpdateOpen(!isUpdateOpen);
  };
  const onChangeHandler = (e: any) => {
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
    setImageFormData(file);
  };
  const openUpdateHandler = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };

  return (
    <>
      { isUpdateOpen &&
      <div className={styles['upload-img']}>
        <div className={styles['preview']}>
          <img 
            src={`${preview ? preview : avatar ? avatar : '/images/user_default.svg'}`} 
            alt=''
          />
          <input 
            type='file'
            onChange={onChangeHandler} 
          />
        </div>
        <div className={styles['buttons']}>
          <Button 
            handler={openUpdateHandler}
            styleMod='fill-rounded'
          >
            Annuler
          </Button>
          <Button 
            handler={uploadImage}
            styleMod='fill-rounded'
          >
            <img src='/images/send-icon.svg' alt='' />
            Valider
          </Button>
        </div>
      </div>
      }
      { !isUpdateOpen &&
      <div className={styles['upload-img']}>
        <div className={styles['preview']}>
          <img 
            src={`${(avatar) ? avatar : '/images/user_default.svg'}`} 
            alt=''
          />
        </div>
        { isLoading &&
          <Loader/>
        }
        { !isLoading &&
          <Button 
            handler={openUpdateHandler}
            styleMod='fill-rounded'
          >
            Modifier
          </Button>
        }
      </div>
      }
    </>
  );
}

export {Field, PictureField};