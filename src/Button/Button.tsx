
export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} style={{
      border:'1px solid red'
  }} className={` ${props.className ?? ""}`} />
);
