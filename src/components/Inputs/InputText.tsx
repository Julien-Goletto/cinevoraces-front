import styles from './InputText.module.scss';

type InputTextProps = { 
  label?: string,
  onChange?: onChangeEventHandler,
  value?: string,
  name: string,
  placeholder: string,
  type: string,
  defaultValue?: string | number
}

/**
 * @return              \<input\> type text/mail/psw
 * @param label         add a \<label\> on top of \<input\>
 * @param name          set \<input\> name
 * @param type          set \<input\> type
 * @param placeholder   set \<input\> placeholder
 * @param onChange      set onChange event
 * @param value         set \<input\> value
 */
function InputText({label, name, type, placeholder, onChange, value}: InputTextProps) {
  // Look for type name to setup correct icon
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
        className={`${styles.input} ${styles[`input--${className}`]}`} 
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
export default InputText;