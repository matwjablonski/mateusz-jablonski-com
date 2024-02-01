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

export const WowBox = ({ children }) => (
  <div className="
    bg-main-500 py-2 px-3 rounded-sm text-main-100 text-sm max-w-[450px] mt-2
  ">{children}</div>
);
