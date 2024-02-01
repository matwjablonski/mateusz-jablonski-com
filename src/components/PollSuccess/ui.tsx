export const Wrapper = ({ children }) => (
  <div className="mt-48 mb-64 flex items-center justify-center flex-col">
    {children}
  </div>
);

export const Title = ({ children }) => (
  <h3 className="text-white text-3xl mb-8 text-center font-heading">{children}</h3>
);

export const Text = ({ children }) => (
  <p className="text-main-100 text-center max-w-[800px] mb-4">
    {children}
  </p>
);

export const RefCode = ({ children }) => (
  <p className="uppercase text-3xl text-main-300 tracking-widest mt-8">{children}</p>
);
