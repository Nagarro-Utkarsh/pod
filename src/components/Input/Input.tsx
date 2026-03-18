import styles from "./Input.module.scss";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${styles.input} ${props.className ?? ""}`} />
);
