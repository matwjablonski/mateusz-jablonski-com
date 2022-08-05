import React from "react";
import styles from './RadioButtonsGroup.module.scss';

interface RadioButtonsGroupProps {
    children: React.ReactNode;
}

const RadioButtonsGroup = ({ children }: RadioButtonsGroupProps) => (
    <div className={styles.radioButtonsGroup}>
        {children}
    </div>
);

export default RadioButtonsGroup;