import { Button } from 'components/Buttons/Button';
import { useState } from 'react';
import styles from './UserParams.module.scss';

function UserPicUploader ({avatar}: {avatar: string}) {
  const [ isUpdateOpen, setIsUpdateOpen ] = useState(false);
  const [ image, setImage ]               = useState<any>('');
  const [ preview, setPreview ]           = useState<any>(undefined);

  const uploadImage = () => {
  };
  const onChangeHandler = (e: any) => {
    const [file] = e.target.files;
    setImage(file);
    setPreview(URL.createObjectURL(file));
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
            src={`${preview ? preview : avatar}`} 
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
            src={avatar} 
            alt=''
          />
        </div>
        <Button 
          handler={openUpdateHandler}
          styleMod='fill-rounded'
        >
          Modifier
        </Button>
      </div>
      }
    </>
  );
}

export default UserPicUploader;