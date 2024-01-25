import React, { FunctionComponent } from 'react';
import { TitleProps } from './Title.types';
import { TitleItem } from './ui';

const Title: FunctionComponent<TitleProps> = ({ classes, children, capitalize, dark }) => (
  <TitleItem dark={dark} capitalize={capitalize} classes={classes}>
    {children}
  </TitleItem>
)

export default Title
