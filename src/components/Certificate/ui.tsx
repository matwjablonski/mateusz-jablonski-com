export const Wrapper = ({ children }) => (
  <section className="
    my-16
  ">{children}</section>
);

export const Title = ({ children }) => (
  <h2 className="
    text-white
    text-4xl
    font-heading
    font-medium
    uppercase
    mb-16
  ">{children}</h2>
);

export const Subtitle = ({ children }) => (
  <small className="
    text-white
    text-xs
    uppercase
    block
    mt-2
    tracking-widest
    
    [&>a]:text-main-300
  ">{children}</small>
);

export const AwardedNote = ({ children }) => (
  <p className="uppercase text-xs text-main-100 tracking-widest font-heading font-medium">{children}</p>
);

export const Name = ({ children }) => (
  <p className="
    text-2xl
    font-heading
    my-2
    mb-8
    text-white
  ">{children}</p>
);

export const Description = ({ children }) => (
  <div className="max-w-[600px] [&>p]:pb-4">{children}</div>
);

export const Text = ({ children }) => (
  <p className="text-main-100">{children}</p>
);

export const List = ({ children }) => (
  <ul className="text-main-100 list-disc ml-8">{children}</ul>
);

export const TagList = ({ children }) => (
  <div className="flex gap-6 mt-16">{children}</div>
);

export const Tag = ({ children }) => (
  <div className="
    bg-main-100
    px-3
    py-1
    text-main-700
    rounded-full
  ">{children}</div>
);
