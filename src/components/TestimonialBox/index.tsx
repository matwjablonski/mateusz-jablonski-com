import { FC } from "react";
import { TestimonialBoxProps } from "./TestimonialBox.types";
import styles from './TestimonialBox.module.scss';

const TestimonialBox: FC<TestimonialBoxProps> = ({ testimonial }) => {
    return <div className={styles.testimonialBox}>
        <h4 className={styles.name}>{testimonial.name}</h4>
        <p className={styles.content}>{testimonial.content}</p>
    </div>;
}

export default TestimonialBox;
