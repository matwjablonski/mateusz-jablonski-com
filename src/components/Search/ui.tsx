import { PropsWithChildren } from 'react';
import BulbIcon from '../../public/icons/bulb.svg';
import Image from 'next/image';

export const Tip = ({ children }: PropsWithChildren<{}>) => (
  <div>
    <p className={`
      text-gray-800
      text-sm
      flex
      gap-2
      items-center
      mb-4
    `}>
      <Image src={BulbIcon} alt={'bulb'} width={20} height={20} />
      {children}
      </p>
  </div>
);

export const ResultsWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className="mt-8">{children}</div>
);

export const ResultsMessage = ({ children }: PropsWithChildren<{}>) => (
  <p className={`
    text-gray-800
    text-sm
    mb-4
  `}>
    {children}
  </p>
);
