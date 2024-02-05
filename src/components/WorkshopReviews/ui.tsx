export const Wrapper = ({ children }) => (
  <section className="
    border-t-2
    border-main-100
    pt-12
    mb-16
  ">
    {children}
  </section>
);

export const Title = ({ children }) => (
  <h2 className="mb-12 font-heading font-medium text-3xl text-main-900">{children}</h2>
)

export const Reviews = ({ children }) => (
  <div className="flex flex-wrap gap-6">{children}</div>
);
