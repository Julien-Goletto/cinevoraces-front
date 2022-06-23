import { Button } from 'components/Inputs/InputsLib';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserUpdatePictureMutation } from 'redux/api';
import Loader from 'components/Loader/Loader';
import styles from './UserParams.module.scss';

function UserPicUploader ({avatar}: {avatar: string}) {
  const { id }  = useParams();
  const [ isUpdateOpen, setIsUpdateOpen ]   = useState(false);
  const [ imageFormData, setImageFormData ] = useState<any>('');
  const [ preview, setPreview ]             = useState<any>(undefined);
  const [updateUserPicture, { isSuccess, isLoading }] = useUserUpdatePictureMutation();

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

export default UserPicUploader;