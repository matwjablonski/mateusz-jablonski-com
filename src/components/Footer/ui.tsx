export const Wrapper = ({ children }) => (
  <footer className={`
    mt-16
    pb-22
  `}>{children}</footer>  
);

export const Copy = ({ children, dark }) => (
  <section className={`
    flex
    ${dark ? 'border-main-100' : 'border-main-900'}
    border-t
    flex-col
    items-center
    justify-between
    pt-6

    md:flex-row
  `}>{children}</section>
);

export const CopyInner = ({ children }) => (
  <div className="
    flex
    items-center
    flex-col
    text-center
    mb-12

    sm:flex-row
    sm:text-start

    md:mb-0
  ">{children}</div>
);

export const Info = ({ children, dark }) => (
  <p className={`
    ${dark ? 'text-main-100' : 'text-main-900'}
    ml-4
    text-sm
    leading-[1.7]
    tracking-tight
  `}>{children}</p>
);

export const FooterMenu = ({ children }) => (
  <ul className="
    flex
    items-center
  ">{children}</ul>
);

export const FooterMenuItem = ({ children, dark }) => (
  <li className={`
    ${dark ? 'text-main-100' : 'text-main-900'}
    text-sm
    font-medium
    underline
    pl-6
    leading-[1.7]
    tracking-tight
  `}>
    {children}
  </li>
);
