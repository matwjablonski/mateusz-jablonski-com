export const Wrapper = ({ children }) => (
  <section className="
    flex
    mb-12
    justify-between
    flex-col

    lg:flex-row
  ">{children}</section>
);

export const Title = ({ children, dark }) => (
  <h2 className={`
    font-heading
    text-[40px]
    font-normal
    mr-4
    mb-8
    max-w-[450px]
    leading-[1.2]
    grow
    shrink-0
    basis-auto
    ${dark ? 'text-white' : 'text-main-900'}

    lg:max-w-[350px]

    [&_span]:text-main-500
    [&_span]:bg-clip-text
    [&_span]:bg-gradient-to-l
    [&_span]:from-[#4098f6]
    [&_span]:to-[#0040ef]
    [&_span]:[-webkit-text-fill-color:transparent]
  `}>{children}</h2>
);

export const Tiles = ({ children }) => (
  <div className="
    flex
    gap-4
    w-full
    flex-wrap
    
    lg:gap-6
    lg:justify-end
    lg:-mr-4
  ">{children}</div>
);

