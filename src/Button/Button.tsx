
export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={` ${props.className ?? ""}`} />
);
