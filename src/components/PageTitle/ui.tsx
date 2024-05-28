export const Wrapper = ({ children, dark, center }) => (
  <div className={`${center ? 'text-center' : ''} mb-16`}>
    {children}
  </div>
);

export const Text = ({ children, dark, center }) => (
  <p className={`
    ${dark ? 'text-white' : 'text-main-700'}
    ${center ? `
      text-center
      mx-auto
      mb-16
    ` : 'mx-0'}

    max-w-[640px]
    text-lg
    text-normal
    tracking-tight
    leading-[1.4]
  `}>{children}</p>
);
