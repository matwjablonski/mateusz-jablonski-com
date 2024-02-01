export const Section = ({ children, isVisible }) => (
  <section className={`
    mt-14
    min-h-[50vh]
    ${isVisible ? `
      block
    ` : `
      hidden
    `}
  `}>
    {children}
  </section>
);

export const Title = ({ children }) => (
  <h2 className="text-white text-3xl">{children}</h2>
)

export const Step = ({ children }) => (
  <div className="text-main-100 mb-2">{children}</div>
);

export const Text = ({ children }) => (
  <p className="text-main-100 text-sm mb-12">{children}</p>
);
