export const ReviewBox = ({ children }) => (
  <div className="
    grow
    shrink-0
    basis-1/2
    max-w-[calc(50%-2rem)]
    p-8
    shadow-lg
    rounded-lg
    mb-6
  ">{children}</div>
)

export const Content = ({ children }) => (
  <p className="text-main-700 text-lg">{children}</p>
);
