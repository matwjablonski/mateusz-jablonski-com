import { FC } from "react";
import { TestimonialsProps } from "./Testimonials.types";
import styles from './Testimonials.module.scss'
import TestimonialBox from "../TestimonialBox";

const Testimonials: FC<TestimonialsProps> = ({ testimonials }) => {
    return (
        <div className={styles.testimonials}>
            <h3 className={styles.testimonialsTitle}>Co mówią o mojej pracy?</h3>
            <p className={styles.testimonialsText}>Największą wartością dla mnie jest zadowolenie moich odbiorców: czytelników, słuchaczy, widzów i osób, których pomagam realizować ich cele. Poniżej znajdziesz kilka wybranych opinii na temat mojej pracy.</p>
            <div className={styles.testimonialsList}>
                {testimonials.map(testimonial => <TestimonialBox key={testimonial.name} testimonial={testimonial} />)}
            </div>
        </div>
    )
}

export default Testimonials;
