export const Wrapper = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className="
      gap-2 
      text-main-900 
      font-heading 
      font-medium 
      text-lg 
      cursor-pointer 
      items-center 
      hidden 
      
      lg:flex"
  >{children}</div>
);

export const CommentsIcon = ({ children }) => (
  <div className="h-6">{children}</div>
);
