import Image from 'next/image';
import { useState } from 'react';
import ExpandArrowIco from '../../public/icons/expand-arrow.svg';

export const Wrapper = ({ children }) => (
  <section className="mb-16 max-w-3xl">{children}</section>
);

export const Title = ({ children }) => (
  <h2 className="mb-6 font-heading font-medium text-3xl text-main-900">{children}</h2>
);

export const Chapter = ({ children }) => {
  const [ isChapterExpanded, setIsChapterExpanded ] = useState(true);

  return (
    <div
      className={`
        py-3
        px-4
        bg-main-100
        rounded-md
        flex
        justify-between
        items-center
        cursor-pointer
        transition-all
  
        ${isChapterExpanded ? `
          [&+ol]:h-auto
        ` : `
          [&+ol]:h-0
          [&_img]:rotate-180  
        `}
      `}
      onClick={() => setIsChapterExpanded(v => !v)}
    >
      <h3 className="font-heading text-medium text-lg text-main-900 leading-[1.2]">{children}</h3>
      <Image src={ExpandArrowIco} alt="" width={24} height={24} />
    </div>
  );
}

export const Topics = ({ children }) => (
  <ol className="
    overflow-hidden
    mb-4
    pr-4
    pl-6
    ml-4
    pt-4
    list-decimal
  ">
    {children}
  </ol>
);

export const Topic = ({ children }) => (
  <li className="
    text-main-700
    font-normal
    text-base
    tracking-tight
    pb-2
  ">{children}</li>
);
