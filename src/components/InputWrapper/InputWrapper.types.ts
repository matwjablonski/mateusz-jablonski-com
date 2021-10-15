export enum InputPlaceholderTypes {
    NEWSLETTER = 'newsletter',
}

export interface InputWrapperProps {
    label?: string,
    name?: string;
    className?: string;   
    icon?: InputPlaceholderTypes;
    error?: boolean;
    success?: boolean;
}
