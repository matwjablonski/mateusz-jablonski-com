import { UseFormRegisterReturn } from "react-hook-form";
import styles from './RadioButton.module.scss';
import Image from "next/image";

interface RadioButtonProps extends Partial<HTMLInputElement> {
    register: (key: string) => UseFormRegisterReturn;
    name: string;
    label: string;
    icon?: any;
    iconWidth?: number | string;
}

const RadioButton = ({
    value,
    register,
    name,
    label,
    icon,
    iconWidth,
}: RadioButtonProps) => (
    <div className={styles.radioButton}>
        <input
            {...register(name)}
            value={value}
            type="radio"
            className={styles.input}
            id={`${name}_${label}`}
        />
        <label htmlFor={`${name}_${label}`} className={styles.label}>
            {
                icon && (
                    <div style={{ width: iconWidth }} className={styles.labelIcon}>
                        <Image src={icon} width={iconWidth || 0} layout="fill"/>
                    </div>
                )
            }
            {label}
        </label>
    </div>
);

export default RadioButton;
