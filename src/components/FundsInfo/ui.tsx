export const Wrapper = ({ children, dark }) => (
  <section
    className={`
      flex
      flex-col
      justify-between
      mb-8
      py-8
      px-6
      rounded-[8px]
      border-2
      border-funds-green-opacity-50

      ${dark ? 'bg-white' : ''}

      sm:flex-row
      sm:items-center

      [&_a]:text-funds-green
      [&_a]:text-semibold

      [&_strong]:text-funds-green
      [&_strong]:text-semibold

      [&_p]:text-2xl
      [&_p]:mb-6
    `}
  >
    {children}
  </section>
);

export const ImageBox = ({ children }) => (
  <div
    className="
      order-1
      mb-6

      sm:mb-0
      sm:order-none

      [&_img]:max-w-[100%]
      [&_img]:h-auto
    "
  >{children}</div>
);

export const ContentBox = ({ children }) => (
  <div
    className="
      order-2

      sm:order-none
      sm:mr-4
      sm:grow-0
      sm:shrink
      sm:basis-[60%]

      md:mr-0
    "
  >{children}</div>
);
