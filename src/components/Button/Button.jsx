import styles from './Button.module.css';

const Button = ({ handleClick, text }) => {
  return (
    <button type="button" onClick={handleClick} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
