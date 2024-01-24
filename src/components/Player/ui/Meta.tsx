export const Meta = ({ children }) => (
  <div
    className="
      flex
      justify-between
      flex-col
      w-full
      ml-6
      
      lg:-ml-2
    "
  >{children}</div>
);

export const MetaArea = ({ children }) => (
  <div className="flex">
    {children}
  </div>
);

export const MetaBottom = ({ children }) => (
  <div className="flex justify-between text-right items-center">
    {children}
  </div>
);

export const CreatedDate = ({ children }) => (
  <div
    className="
      font-heading
      text-xs
      font-medium
      uppercase
      text-main-300
    "
  >{children}</div>
);

export const Duration = ({ children }) => (
  <div 
    className="
      text-white
      font-heading
      font-medium
      text-sm
      uppercase
    "
  >{children}</div>
);
