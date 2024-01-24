import PlayIcon from '../../../public/icons/play.svg';
import PauseIcon from '../../../public/icons/pause.svg';

export const PlayPauseButton = ({ play, isPlayerReady, isPlaying, label }) => {
  console.log(PlayIcon?.src)
  return (
  <button 
    onClick={play}
    // className={cx(styles.ActionButton, !isPlaying ? styles.isPlaying : styles.isPaused)}
    className={`
      flex
      items-center
      justify-center
      relative
      cursor-pointer
      w-[56px]
      h-[48px]
      transition-all
      rounded-[4px]

      disabled:opacity-50   
      disabled:cursor-default

      hover:transition-all
      
      
      ${isPlaying ? `
        bg-main-300
        hover:bg-main-500
      ` : `
        bg-gradient-to-r
        from-main-500
        to-main-300
        hover:bg-gradient-to-r
        hover:from-main-300
        hover:to-main-500
      `}
    `}
    aria-label={label}
    disabled={!isPlayerReady}    
  >
    <div
      style={{ backgroundImage: `url(${isPlaying ? PauseIcon.src : PlayIcon.src})` }}
      className="
        bg-no-repeat
        bg-center
        block
        w-full
        h-full
      "  
    />
  </button>
)};

export const LoadingAudio = ({ children }) => (
  <div
    className="
      font-heading
      text-xs
      text-main-300
      uppercase
      absolute
      left-0
      top-[30px]
    "
  >{children}</div>
);

export const Times = ({ children }) => (
  <div className="flex justify-between my-4">
    {children}
  </div>
);

export const Time = ({ children }) => (
  <div
    className="
      font-heading
      text-xs
      font-medium
      text-white
    "
  >{children}</div>
);
