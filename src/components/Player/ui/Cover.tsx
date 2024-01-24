export const PodcastCover = ({ children }) => (
  <div
    className="
      relative
      min-w-[150px]
      max-w-[150px]
      text-[0]
      left-0
      hidden

      sm:block
      lg:-left-12

      [&>img]:rounded-[4px]
    "
  >
    {children}
  </div>
);







