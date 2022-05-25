import { Button } from 'components/Buttons/Button';
import styles from './Admin.module.scss';

function User({user}: {[key: string]: any}) {
  return(
    <tr>
      <td className={styles['table-case']}>{user.pseudo}</td>
      <td className={styles['table-case']}>{user.mail}</td>
      <td className={styles['table-case']}>{user.role}</td>
      <td className={styles['table-case']}>{user.created_at}</td>
      <td className={styles['table-case']}>
        <Button
          styleMod='rounded-fill'
        >Passer admin</Button>
      </td>
      <td className={styles['table-case']}>
        <Button
          styleMod='rounded-fill'
        >Supprimer</Button>
      </td>
    </tr>
  );
}

export default User;