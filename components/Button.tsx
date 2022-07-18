import styles from '../styles/Button.module.css'

type ButtonTypes = "button" | "submit" | "reset"
interface ButtonProps {
    name?: string,
    type?: ButtonTypes,
    value?: string,
    disabled?: boolean,
    text?: string
}

export const Button = ({name, value, type, disabled, text}: ButtonProps) => {
    return <button className={styles.button} name={name ? name : ""} value={value ? value : ""} type={type ? type : "button"} disabled={disabled ? disabled : false}>{text}</button>
}