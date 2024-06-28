import { PropsWithChildren, SyntheticEvent } from 'react';

export const Wrapper = ({ children, handleClick, isLast }: PropsWithChildren<{handleClick(e: SyntheticEvent): void; isLast: boolean; }>) => (
  <div className={`
    py-4 border-b-gray-300 ${isLast ? '' : 'border-b'} cursor-pointer font-heading text-sm font-thin text-main-900
  `} onClick={handleClick}>
    {children}
  </div>
)
