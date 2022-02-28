import { FC } from "react";
import cx from 'classnames';
import { TestimonialsProps } from "./Testimonials.types";
import styles from './Testimonials.module.scss'
import TestimonialBox from "../TestimonialBox";

const Testimonials: FC<TestimonialsProps> = ({ testimonials, title, description, contentAlign }) => {
    return (
        <div className={styles.testimonials}>
            <h3 className={cx(styles.testimonialsTitle, styles[`is-${contentAlign}`])}>{title}</h3>
            <p className={cx(styles.testimonialsText, styles[`is-${contentAlign}`])}>{description}</p>
            <div className={styles.testimonialsList}>
                {testimonials.map(testimonial => <TestimonialBox key={testimonial.name} testimonial={testimonial} />)}
            </div>
        </div>
    )
}

export default Testimonials;
