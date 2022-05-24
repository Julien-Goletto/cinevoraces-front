import styles from './About.module.scss';

function About({children}: AboutProps) {
  return (
    <section className={styles.about}>
      {children}
    </section>
  );
}

export default About;