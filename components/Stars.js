import styles from '../styles/Stars.module.css';

export default function Stars({ height }) {
  return (
    <>
      <div style={{height: height}} className={styles.stars} ></div>
      <div style={{height: height}} className={styles.twinkling} ></div>
    </>
  );
}
