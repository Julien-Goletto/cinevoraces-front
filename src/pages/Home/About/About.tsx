import styles from './About.module.scss';

type AboutProps = {
  children?: React.ReactNode
}

function About({children}: AboutProps) {
  return (
    <section className={styles.about}>
      {children}
    </section>
  );
}

export default About;