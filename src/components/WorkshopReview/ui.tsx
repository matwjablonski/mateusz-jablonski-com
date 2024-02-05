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
    flex
    flex-col
    items-between
    justify-between
  ">{children}</div>
)

export const Content = ({ children }) => (
  <p className="text-main-700 text-lg mb-8">{children}</p>
);

export const Meta = ({ children }) => (
  <div className="flex justify-between">{children}</div>
);

export const NameAndDate = ({ children }) => (
  <div className="flex flex-col">{children}</div>
);

export const Name = ({ children }) => (
  <h4 className="font-bold text-main-700">{children}</h4>
);

export const Date = ({ children }) => (
  <span className="text-gray-500">{children}</span>
);
