export const Wrapper = ({ children }) => (
  <div className="
    flex 
    -mx-4
    flex-col
    mb-12
    mt-12
    flex-wrap

    sm:flex-row
  ">{children}</div>
);

export const WorkshopBox = ({ children }) => (
  <div className="
    grow
    shrink-0
    basis-[50%]
    max-w-[50%]
    mb-8
  ">
    {children}
  </div>
)
