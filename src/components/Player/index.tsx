import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {WaveForm, WaveSurfer} from 'wavesurfer-react';
import styles from './Player.module.scss';
import cx from 'classnames';
import { formatTime } from "../../utils/formatTime";
import { Asset } from "contentful";
import Image from "next/image";
import prepareUrl from '../../utils/prepareAssetUrl';
import { convertMinutesToTimeObject } from '../../utils/formatTime'
import { useTranslations } from '../../hooks/useTranslations';
import { Title, Meta, MetaArea, MetaBottom, CreatedDate, PodcastCover, Times, Time, LoadingAudio, Duration, PlayPauseButton } from './ui';

interface PlayerProps {
    file: string;
    title: string;
    description: string;
    cover: Asset;
    createdDate?: Date;
    time?: number;
    podcastCover?: Asset;
}

 const Player = ({ file, title, createdDate, time, podcastCover }: PlayerProps) => {
    const wavesurferRef = useRef<any>();
    const [backgroundPosiiton, setBackgroundPosition] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const player = useRef<HTMLDivElement>(null);
    const { t } = useTranslations();

    const formattedTime = () => {
        const { minutes, hours } = convertMinutesToTimeObject(time);

        let minutesTranslations = t.COMMON.MINUTE;

        if (time > 1 && time < 5) {
            minutesTranslations = t.COMMON.MINUTES_2_4;
        }

        if (time >= 5) {
        minutesTranslations = t.COMMON.MINUTES;
        }

        return `${time} ${minutesTranslations}`;
    }

    useEffect(() => {
        if (player && player.current) {
            setBackgroundPosition(-player.current.getBoundingClientRect().width)
        }
    }, []);

    const plugins = useMemo(() => {
        return [
            
        ].filter(Boolean)
    }, []);

    const handleWSMount = useCallback((waveSurfer) => {
        wavesurferRef.current = waveSurfer;

        if (wavesurferRef.current) {
            wavesurferRef.current.load(file)
            wavesurferRef.current.on('ready', () => {
                setIsPlayerReady(true);
                setAudioDuration(wavesurferRef.current.getDuration());
            });

            wavesurferRef.current.on('loading', (loadingValue: number) => {
                setLoadingProgress(loadingValue);
            });
            
            wavesurferRef.current.on('audioprocess', (time: number) => {
                const value = time / wavesurferRef.current.getDuration();
                setProgress(value * 100);
                setCurrentTime(time);
                setBackgroundPosition(
                    -(player.current.getBoundingClientRect().width - (value * player.current.getBoundingClientRect().width))
                )
            })

            wavesurferRef.current.on('seek', (progressValue: number) => {
                setProgress(progressValue * 100);
                setCurrentTime(progressValue * wavesurferRef.current.getDuration());
                setBackgroundPosition(
                    -(player.current.getBoundingClientRect().width - (progressValue * player.current.getBoundingClientRect().width))
                )
            })
    
            if (window) {
                // window.surferidze = wavesurferRef.current;
            }
        }
    }, [file]);

    const play = useCallback(() => {
        setIsPlaying((prev) => !prev);
        wavesurferRef.current.playPause();
      }, []);

    return (
        <>
            <MetaArea>
                {podcastCover && <PodcastCover>
                    <Image src={prepareUrl(podcastCover.fields.file.url as string)} width={200} height={200} alt="" />
                </PodcastCover>}
                <Meta>
                    <Title>{title}</Title>
                    <MetaBottom>
                        <div>
                            <PlayPauseButton 
                                label={t.PODCAST.PLAYER.PLAY_PAUSE}
                                isPlayerReady={isPlayerReady}
                                isPlaying={isPlaying}
                                play={play}
                            />
                        </div>
                        <div>
                            <CreatedDate>{createdDate}</CreatedDate>
                            <Duration>{formattedTime()}</Duration>
                        </div>
                    </MetaBottom>
                </Meta>
            </MetaArea>
            <div className={styles.Player}>
                <div className={styles.PlayerOuter}>
                    <div className={styles.InnerPlayer}>
                        {!isPlayerReady && <LoadingAudio>{t.PODCAST.PLAYER.LOADING_FILE} ({loadingProgress}%)</LoadingAudio>}
                        <div className={cx(styles.Wave, isPlayerReady && styles.WaveIsReady)} ref={player} style={{ backgroundPositionX: `${backgroundPosiiton}px`}}>
                            <WaveSurfer 
                                plugins={plugins}
                                onMount={handleWSMount}
                            >                
                                <WaveForm
                                    id="waveform"
                                    cursorColor="transparent"
                                    barGap={4}
                                    barWidth={2}
                                    progressColor="#0136F8"
                                    waveColor="#fff"
                                    autoCenter={false}
                                />
                                
                            </WaveSurfer>
                            <div className={styles.BottomProgressBar} style={{ width: `${progress}%`}}/>
                        </div>
                    </div>
                    <Times>
                        <Time>{formatTime(currentTime)}</Time>
                        <Time>{formatTime(audioDuration)}</Time>
                    </Times>
                </div>
            </div>
        </>
    )
}

export default Player;
