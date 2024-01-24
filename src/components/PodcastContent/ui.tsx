export const Content = ({ children }) => (
  <div
    className="w-100 pb-16 lg:pr-8"
  >{children}</div>
);

export const Title = ({ children }) => (
  <h2
    className="text-main font-heading font-medium text-2xl mb-4 mt-6"
  >{children}</h2>
);

export const TitleLevel3 = ({ children }) => (
  <h3
    className="text-main font-heading font-medium text-xl mb-4 mt-6"
  >{children}</h3>
);

export const TitleLevel4 = ({ children }) => (
  <h4
    className="text-main font-heading font-medium text-lg mb-4 mt-6"
  >{children}</h4>
);

export const TitleLevel5 = ({ children }) => (
  <h4
    className="text-main font-heading font-medium text-lg mb-4 mt-6"
  >{children}</h4>
);

export const ListItem = ({ children }) => (
  <li
    className="
      [&>p]:mb-4
    "
  >{children}</li>
);

export const Dots = () => (
  <div
    className="
      relative
      w-[6px]
      h-[6px]
      rounded-full
      bg-main
      mx-auto
      mb-22
      mt-22

      before:content
      before:block
      before:absolute
      before:w-[6px]
      before:h-[6px]
      before:rounded-full
      before:bg-main
      before:-left-8

      after:content
      after:block
      after:absolute
      after:w-[6px]
      after:h-[6px]
      after:rounded-full
      after:bg-main
      after:-right-8
    "
  />
);

export const Text = ({ children }) => (
  <p className="text-main-700 text-lg mb-6 tracking-tighter">{children}</p>
)

export const ContentBox = ({ children, isTruncated }) => (
  <div
    className={`
      relative
      
      ${isTruncated ? 'line-clamp-22' : ''}
      
      ${isTruncated ? `
        after:content
        after:block
        after:absolute
        after:w-full
        after:h-[200px]
        after:bottom-0
        after:bg-gradient-to-t
        after:from-white
        after:to-transparent
      ` : ''}
    `}
  >{children}</div>
)

export const ButtonBox = ({ children }) => (
  <div className="mt-16 mx-auto flex justify-center">{children}</div>
)

export const Blockquote = ({ children }) => (
  <div className="
    m-0
    lg:-mr-[206px]
    lg:-ml-[206px]
  ">
    <blockquote className="
      border-l-[5px]
      border-main-300
      pl-4

      [&>p]:italic
      [&>p]:font-light
      [&>p]:text-2xl
      [&>p]:leading-normal
    ">
      {children}
    </blockquote>
  </div>
);

export const EmmbeddedAsset = ({ children, description, isImageWide }) => (
  <figure
    className={`
      ${isImageWide} ? '
        drop-shadow-wide-image
        mb-6
        p-0
        text-[0]
        [&>img]:rounded
        mx-0
        mt-0
        lg:-mr-[206px]
        lg:-ml-[206px]
      ' : ''
    `}
  >
    {children}
    {
      description && (
        <figcaption
          className="
            text-main-700
            tracking-tighter
            italic
            text-center
            mx-auto
            mb-0
            mt-8
            max-w-[736px]
            text-lg
          "
        >{description}</figcaption>
      )
    }
  </figure>
)
