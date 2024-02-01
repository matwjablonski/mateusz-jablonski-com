export const Wrapper = ({ children }) => (
  <div
    className="
      flex
      flex-col
      justify-center
      items-center
      h-full-vh
    "
  >{children}</div>
);

export const Message = ({ children, revert }) => (
  <div
    className={`
      mt-4
      ${revert ? `
        text-white
      ` : `
        text-main-900
      `}
    `}
  >{children}</div>
);
