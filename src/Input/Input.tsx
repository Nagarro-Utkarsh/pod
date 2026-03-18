import styles from "@/Input/Input.module.scss";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${styles.input} ${props.className ?? ""}`} />
)