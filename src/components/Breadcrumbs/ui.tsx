export const BreadcrumbsList = ({ children }) => (
  <ul className="
    flex
    mb-8
  ">{children}</ul>
);

export const Item = ({ children, reverse }) => (
  <li
    className={`
      font-heading
      text-xs
      uppercase
      ml-4

      ${reverse ? 'text-main-100' : 'text-main-900'}

      first:ml-0
    `}
  >{children}</li>
);

export const Separator = ({ children }) => (
  <span className="ml-4">{children}</span>
)
