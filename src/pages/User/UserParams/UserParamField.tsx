import { useEffect, useState } from 'react';
import { Button } from 'components/Buttons/Button';
import Input from 'components/Input/Input';
import styles from './UserParams.module.scss';
import userStyles from '../User.module.scss';

type ParamField = {
  field: string,
  defaultValue: string,
  onSubmit: any,
  updateIsSuccess: any
}

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
          <Button 
            handler={handleShowInput}
            styleMod='fill-rounded'
          >
            Modifier
          </Button>
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
            <Input
              name={field}
              type={(field === 'username') ? 'text' : field}
              placeholder={`Entrez votre nouveau ${field}`}
              defaultValue={defaultValue}
            />
            <Input
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