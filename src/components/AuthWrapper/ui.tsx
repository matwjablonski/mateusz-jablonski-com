import { FC, PropsWithChildren } from 'react';
import Bg from '../../public/login-welcome.webp';

export const Wrapper: FC<PropsWithChildren<{}>> = ({children}) => (
  <div className="flex w-full justify-end items-center min-h-[530px] relative mb-12 mt-4">
    {children}
  </div>
);

export const ImageBg = () => (
  <div
    style={{
      backgroundImage: `url('${Bg.src}')`,
    }} 
    className="
      absolute
      left-0
      top-0
      bottom-0
      m-auto
      min-w-[75%]
      h-full
      bg-cover
      overflow-hidden
      rounded-xl
    "
  />
)

export const ActionBox: FC<PropsWithChildren<{}>> = ({children}) => (
  <div className="rounded-md bg-white p-8 min-w-[50%] relative drop-shadow-wide-image">
    {children}
  </div>
);
