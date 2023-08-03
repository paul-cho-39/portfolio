import styles from './styles.module.css';

const Sunrays = () => {
   return (
      <div>
         <div className='relative overflow-hidden shadow-sm'></div>
         <div className={`${styles.r2}, ${styles.sunrays}`}>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
         </div>
         {/* <div className={`${styles.ray1}, ${styles.sunrays}`}> */}
         <div className={`${styles.r2}, ${styles.sunrays}`}>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
            <div className={styles.light}></div>
         </div>
         <div className={styles.sun}></div>
         <div className='mask'></div>
      </div>
   );
};

export default Sunrays;
