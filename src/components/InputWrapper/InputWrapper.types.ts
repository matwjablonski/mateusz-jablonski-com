import React from "react";

export enum InputPlaceholderTypes {
    NEWSLETTER = 'newsletter',
    USER = 'user',
    COURSE = 'course',
    TRAINING = 'training',
    PROJECT = 'project',
    PHONE = 'phone',
    EMAIL = 'email',
    DAY = 'day',
    NIGHT = 'night',
    PASSWORD = 'password',
}

export interface InputWrapperProps {
    label?: string,
    name?: string;
    className?: string;   
    icon?: InputPlaceholderTypes;
    error?: boolean;
    success?: boolean;
    children: React.ReactNode;
}
