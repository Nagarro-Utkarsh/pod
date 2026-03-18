import { Input } from "@/Input/Input";
import { Button } from "@/Button/Button";
import styles from "@/SubmitForm/SubmitForm.module.scss";

interface SubmitFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const SubmitForm = ({ onSubmit, onChange, value }: SubmitFormProps) => (
  <form onSubmit={onSubmit} className={styles.form}>
    <Input value={value} onChange={onChange} />
    <Button type="submit">Submit</Button>
  </form>
);
