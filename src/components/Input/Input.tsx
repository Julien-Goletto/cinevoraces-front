import './Input.module.scss';
import styles from './Input.module.scss';

type InputProps = {
  label: string,
  name: string,
  placeholder: string,
  type: string
} 

function Input({label, name, type, placeholder}: InputProps) {

  return (
    <div className={styles.container}>
      <label className= {styles.label} htmlFor={name}>{label}</label>
      <input className={`${styles.input} ${styles['input--username']} `} type={type} placeholder={placeholder} name={name} />
    </div>
  );
}
export default Input;