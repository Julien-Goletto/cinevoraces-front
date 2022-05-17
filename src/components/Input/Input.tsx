import './Input.module.scss';
import styles from './Input.module.scss';

function Input({label, name, type, placeholder, onChange, value}: FieldsetTextInput) {
  const classResolver = (searchedString: string) => {
    if (RegExp(`\\b${searchedString}\\b`).test(name)) {
      return searchedString;
    } else {
      return name;
    }
  };
  const className = classResolver('password');

  return (
    <div className={styles.container}>
      { label &&
        <label className= {styles.label} htmlFor={name}>{label}</label>
      }
      <input 
        className={`
          ${styles.input} 
          ${styles[`input--${className}`]} 
        `} 
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
export default Input;