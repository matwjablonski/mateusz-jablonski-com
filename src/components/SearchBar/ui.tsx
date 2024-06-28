import { PropsWithChildren } from 'react';

export const SearchMenuItemMobile = ({ children, handleClick }: PropsWithChildren<{ handleClick(): void }>) => (
  <div className="md:hidden text-white text-left" onClick={handleClick}>{children}</div>
);
