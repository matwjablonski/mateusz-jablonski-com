import { ReactNode, SyntheticEvent } from 'react';
import { Wrapper } from './ui';

type SearchResultItem = {
  handleClick(e: SyntheticEvent): void;
  title: ReactNode;
  isLast: boolean;
}

export const SearchResultItem = ({ handleClick, title, isLast }: SearchResultItem) => {
  
  return (
    <Wrapper handleClick={handleClick} isLast={isLast}>
      {title}
    </Wrapper>
  )
}
