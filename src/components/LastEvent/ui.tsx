import { FC, PropsWithChildren } from 'react';
import PlaceIcon from '../../public/icons/armchair.svg';
import ClockIcon from '../../public/icons/clock-4.svg';
import ClockIconReverse from '../../public/icons/clock-4-700.svg';
import PlaceIconReverse from '../../public/icons/armchair-700.svg';
import Image from 'next/image';

export const Wrapper: FC<PropsWithChildren<{ passed: boolean; }>> = ({ children, passed }) => (
  <div className={`
    bg-gradient-to-br
    ${passed ? 'from-gray-200 to-gray-500' : 'from-main-500 to-main-300'}
    rounded-lg
    p-8
    shadow-icon-box
    flex
    flex-col
    justify-between
    transition-all

    hover:scale-105
    hover:transition-all
  `}>{children}</div>
);

export const Title: FC<PropsWithChildren<{ passed: boolean; }>> = ({ children, passed }) => (
  <h3 className={
    `
    ${passed ? 'text-main-900' : 'text-white'} 
      font-heading
      font-bold
      text-md
      mb-8
      flex
      flex-col
      justify-center
    `
  }>{children}</h3>
);

export const DateBox: FC<PropsWithChildren<{ passed: boolean; }>> = ({ children, passed }) => (
  <div className={`flex ${passed ? 'text-main-700' : 'text-white'} mb-2 text-sm items-center gap-2`}>
    <Image src={passed ? ClockIconReverse : ClockIcon} width={24} height={24} alt="" />
    {children}
  </div>
);

export const JustIn: FC<PropsWithChildren<{}>> = ({ children }) => (
  <span className="bg-white py-1 px-2 text-xs rounded-sm text-main-500">{children}</span>
);

export const Place: FC<PropsWithChildren<{ passed: boolean; }>> = ({ children, passed }) => (
  <div className={`flex ${passed ? 'text-main-700' : 'text-white'} text-sm items-center gap-2`}>
    <Image src={passed ? PlaceIconReverse : PlaceIcon} width={24} height={24} alt="" />
    {children}
  </div>
);
