import Image from "next/image";
import { ReactNode } from "react";
import styles from "./ButtonBox.module.scss";

interface ButtonBoxProps {
    text: string;
    icon?: string;
    iconWidth?: number | string;
    iconHeight?: number | string;
    children: ReactNode;
}

const ButtonBox = ({ text, icon, iconWidth, iconHeight, children }: ButtonBoxProps) => (
    <div className={styles.buttonBox}>
        <div className={styles.messageBox}>
            {icon && (
                <div className={styles.icon} style={{ height: iconHeight || 0}}>
                    <Image src={icon} width={iconWidth || 0} height={iconHeight || 0}/>
                </div>
            )}
            <label className={styles.text}>{text}</label>
        </div>
        {children}
    </div>
)

export default ButtonBox;
