export const ArticleWrapper = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

export const Wrapper = ({ children }) => (
  <article
    className="
      flex
      relative
      flex-col
      items-start
      mb-16

      lg:flex-row-reverse
    "
  >
    {children}
  </article>
);

export const Sticky = ({ children }) => (
  <div
    className="
      relative
      grow
      shrink-0
      basis-[100%]
      w-full
      
      lg:basis-[40%]
      lg:sticky
      lg:top-0
    "
  >
    {children}
  </div>
);

export const ContentWrapper = ({ children }) => (
  <div
    className="
      basis-[60%]
      grow
      shrink-0
      px-0
      
      lg:pr-12
    "
  >{children}</div>
);
