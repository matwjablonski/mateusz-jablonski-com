import { UseFormRegisterReturn } from "react-hook-form";
import styles from './RadioButton.module.scss';

interface RadioButtonProps extends Partial<HTMLInputElement> {
    register: (key: string) => UseFormRegisterReturn;
    name: string;
    label: string;
}

const RadioButton = ({
    value,
    register,
    name,
    label,
}: RadioButtonProps) => (
    <div className={styles.radioButton}>
        <input
            {...register(name)}
            value={value}
            type="radio"
            className={styles.input}
            id={`${name}_${label}`}
        />
        <label htmlFor={`${name}_${label}`} className={styles.label}>{label}</label>
    </div>
);

export default RadioButton;
