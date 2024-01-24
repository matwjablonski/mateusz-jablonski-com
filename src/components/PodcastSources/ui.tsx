import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { FC, PropsWithChildren } from 'react';

export const Wrapper = ({ children }) => (
  <div className="mb-8">{children}</div>
);

export const Title = ({ children }) => (
  <h3 className="mb-4 mt-6 text-main-900 font-heading font-medium text-lg">{children}</h3>
)

export const SourcesLine = ({ children }) => (
  <div className="flex gap-8 sm:gap-6 justify-start items-start flex-wrap md:flex-nowrap">{children}</div>
);

export const SourceLink: FC<PropsWithChildren<LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>> = ({ children, ...rest }) => (
  <Link
    className="
      flex
      basis-[40%]
      min-w-[40%]
      min-h-[70px]
      max-w-[40%]
      max-h-[70px]

      sm:min-w-[70px] 
      sm:min-h-[70px]
      sm:max-w-[70px]
      sm:max-h-[70px]

      md:basis-auto
    "
    {...rest}
  >{children}</Link>
);

export const Icon = ({ src, alt }) => (
  <div className="p-4 shadow-icon-box flex justify-center items-center text-[0] flex-auto">
    <Image src={src} alt={alt} className="max-w-[37px]" />
  </div>
);
