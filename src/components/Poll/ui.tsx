export const Actions = ({ children }) => (
  <div className="flex gap-4 justify-between flex-row-reverse">{children}</div>
)

export const WowBox = ({ children }) => (
  <div className="
    bg-main-500 p-6 rounded-sm text-main-100 max-w-[600px] mb-4
  ">{children}</div>
);

export const PoorBox = ({ children }) => (
  <div className="
    bg-main-100 p-6 rounded-sm text-main-900 max-w-[600px] mb-4
  ">{children}</div>
);
