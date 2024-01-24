import PlayerBg from '../../public/player-bg.svg';

export const Wrapper = ({ children }) => (
  <div
    style={{
      backgroundImage: `url('${PlayerBg.src}')`,
    }}
    className="
      relative
      p-6
      bg-cover
      bg-no-repeat
      rounded-[14px]

      lg:bg-[-28px]
    "
  >{children}</div>
);
