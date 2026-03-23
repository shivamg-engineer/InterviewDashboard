import styles from './Exercise2.module.css'

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

const Button = ({label, variant = "primary"}: ButtonProps) => {
return (
    <button className={`${styles.button} ${variant==="secondary" ? styles.secondary:""}`} >
        {label}
    </button>
);
}

export default Button;