import { FC, PropsWithChildren } from 'react';

export const Section: FC<PropsWithChildren<{}>> = ({ children }) => (
  <section className="mb-24 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{children}</section>
)
