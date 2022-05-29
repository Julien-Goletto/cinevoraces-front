import { Button } from 'components/Buttons/Button';
import { timeStamp } from 'console';
import { useState } from 'react';
import styles from './UserParams.module.scss';

function UserPicUploader ({avatar}: {avatar: string}) {
  const [ isUpdateOpen, setIsUpdateOpen ] = useState(false);
  const [ image, setImage ]               = useState<any>('');
  const [ preview, setPreview ]           = useState<any>(undefined);
  // const [ url, setUrl ] = useState("");

  const uploadImage = () => {};
  const onChangeHandler = (e: any) => {
    const [file] = e.target.files;
    // const eagerParams = 'c_crop,w_200,h_200,g_faces';
    // const folder = '';
    // setImage(file);
    // setPreview(URL.createObjectURL(file));
    const data = new FormData();
    // data.append('timestamp', timeStamp);
    // data.append('signature', signature);
    // data.append('api_key', process.env.REACT_APP_CLOUD_API_KEY!);
    // data.append('eager', eagerParams);
    // data.append('folder', folder);
    data.append('file', file);
    data.append('upload_preset', process.env.REACT_APP_CLOUD_PRESET!);
    data.append('cloud_name', process.env.REACT_APP_CLOUD_NAME!);
    fetch(`${process.env.REACT_APP_CLOUD_URL}/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, { method: 'post', body: data })
      .then(resp => resp.json())
      .then(data => {setPreview(data.url);})
      .catch(err => console.log(err)
      );
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