import { useEffect, useState } from 'react';
import { Button, InputText } from 'components/Inputs/InputsLib';
import styles from './UserParams.module.scss';
import userStyles from '../User.module.scss';

function UserParamField ({field, defaultValue, onSubmit, updateIsSuccess}: ParamField) {
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
            <span>
              {field} :</span>
            <span className={styles['info']}>&nbsp;{defaultValue}</span>
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
              htmlFor={field}
            >
              Entrez votre nouveau {field} :
            </label>
            <InputText
              name={field}
              type={(field === 'username') ? 'text' : field}
              placeholder={`Entrez votre nouveau ${field}`}
              defaultValue={defaultValue}
            />
            <InputText
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
        </>
      }
    </form>
  );
}

export default UserParamField;