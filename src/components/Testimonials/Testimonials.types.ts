import { Testimonials } from "../../types/common/Testimonials.types";

export interface TestimonialsProps {
    testimonials: Testimonials[];
    title: string;
    description: string;
    contentAlign: 'center' | 'left' | 'right';
}