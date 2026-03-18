import styles from '@/Button/Button.module.scss';
export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} style={{
      border:'1px solid red'
  }} className={`${styles.button} ${props.className ?? ""}`} />
);
