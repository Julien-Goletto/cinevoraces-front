import './Input.module.scss';
import styles from './Input.module.scss';

function Input({label, name, type, placeholder}: FieldsetTextInput) {

  return (
    <div className={styles.container}>
      { label &&
        <label className= {styles.label} htmlFor={name}>{label}</label>
      }
      <input className={`${styles.input} ${styles[`input--${name}`]} `} type={type} placeholder={placeholder} name={name} />
    </div>
  );
}
export default Input;