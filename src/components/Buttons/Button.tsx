import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
/**
 * @return          either \<button\> or \<Link\>
 * @param href      return \<Link\> if used
 * @param handler   onClick handler
 * @param styleMod  'fill' | 'rounded' | 'white' (joinded with '-')
 */
function Button({ children, styleMod, handler, href }: Button)  {
  // Get styleMod and look for keywords in string
  const styleResolver = (searchedString: string) => {
    if (RegExp(`\\b${searchedString}\\b`).test(styleMod!)) {
      return searchedString;
    } else {
      return null;
    }
  };
  const isFilled = styleResolver('fill');
  const isRounded = styleResolver('rounded');
  const isWhite = styleResolver('white');
  // Set the correct classname
  const className = `
    ${styles['button']}
    ${(isFilled) ? styles['button--full'] : styles['button--empty']}
    ${(isRounded) && styles['button--rounded']}
    ${(isWhite) && styles['button--white']}
  `;
  return(
    <>
      { href &&
        <Link 
          className={className}
          to={href}
          onClick={handler}         
        >
          {children}
        </Link>
      }
      { (!href) &&
        <button
          className={className}
          onClick={handler}
        >
          {children}
        </button>
      }
    </>
  );
};

function ButtonSearch({children}: ButtonSearch)  {
  return (
    <button className={`${styles['button-search']} ${styles['button--full']}`}>{children}</button>
  );
};

export { ButtonSearch , Button };