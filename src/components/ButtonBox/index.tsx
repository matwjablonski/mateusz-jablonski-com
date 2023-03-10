import Image from "next/image";
import { ReactNode } from "react";
import styles from "./ButtonBox.module.scss";

interface ButtonBoxProps {
    text: string;
    icon?: string;
    iconWidth?: number | `${number}`;
    iconHeight?: number | `${number}`;
    children: ReactNode;
}

const ButtonBox = ({ text, icon, iconWidth, iconHeight, children }: ButtonBoxProps) => (
    <div className={styles.buttonBox}>
        <div className={styles.messageBox}>
            {icon && (
                <div className={styles.icon} style={{ height: iconHeight || 0}}>
                    <Image src={icon} width={iconWidth || 0} height={iconHeight || 0} alt=""/>
                </div>
            )}
            <label className={styles.text}>{text}</label>
        </div>
        {children}
    </div>
)

export default ButtonBox;
