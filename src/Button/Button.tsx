import styles from "@/Button/Button.module.scss";

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={`${styles.button} ${props.className ?? ""}`} />
);
