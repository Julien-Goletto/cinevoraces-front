import Input from 'components/Input/Input';
import styles from './UserParams.module.scss';

function UserParams() {
  return(
    <>
      <Input
        name='email'
        type='email'
        placeholder='Entrez votre nouveau email'
      />
    </>
  );
}

export default UserParams;