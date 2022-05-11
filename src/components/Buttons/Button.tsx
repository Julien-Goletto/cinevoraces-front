import styles from './Button.module.scss';

function Button({children, styleMod, handler, href}: ButtonTest)  {
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
  const className = `
    ${styles['button']}
    ${(isFilled) ? styles['button--full'] : styles['button--empty']}
    ${(isRounded) && styles['button--rounded']}
    ${(isWhite) && styles['button--white']}
  `;
  return(
    <>
      { href &&
        <a
          className={className}
          onClick={handler}
          href={href}
        >
          {children}
        </a>
      }
      { !href &&
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