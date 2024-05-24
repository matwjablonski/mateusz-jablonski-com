import { FC, PropsWithChildren } from 'react';

export const Wrapper: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="flex">{children}</div>
);

export const Artist: FC<PropsWithChildren<{}>> = ({ children }) => (
  <h3 className="
   text-main-500
   font-heading
   mb-3
   text-xs
   uppercase
   tracking-wider
  ">{children}</h3>
);

export const ImageWrapper: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="min-w-[160px] overflow-hidden rounded-md drop-shadow-wide-image">{children}</div>
);

export const Title: FC<PropsWithChildren<{}>> = ({ children }) => (
  <h3 className="
    text-main
    font-heading
    text-lg
  ">{children}</h3>
);

export const InfoBox: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div className="
    flex
    flex-col
    justify-center
    ml-4
  ">{children}</div>
);
