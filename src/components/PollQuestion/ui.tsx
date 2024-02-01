export const Wrapper = ({ children, multiple }) => (
  <div className={
    `
      ${multiple ? 'mt-4 mb-16' : 'my-32'}
    `
  }>
    {children}
  </div>
);

export const Question = ({ children }) => (
  <h3 className="text-white text-lg mb-8 relative"><strong>{children}</strong></h3>
);
