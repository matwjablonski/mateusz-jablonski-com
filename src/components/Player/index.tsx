import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {WaveForm, WaveSurfer} from 'wavesurfer-react';
import styles from './Player.module.scss';
import cx from 'classnames';
import { formatTime } from "../../utils/formatTime";
import { Asset } from "contentful";
import Image from "next/image";
import prepareAssetUrl from "../../utils/prepareAssetUrl";
import { convertMinutesToTimeObject } from '../../utils/formatTime'
import ImagePlaceholder from '../ImagePlaceholder';
import { useTranslations } from '../../hooks/useTranslations';

interface PlayerProps {
    file: string;
    title: string;
    description: string;
    cover: Asset;
    createdDate?: Date;
    time?: number;
}

 const Player = ({ file, title, description, cover, createdDate, time }: PlayerProps) => {
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

        let hoursTranslations = t.COMMON.HOUR;
        let minutesTranslations = t.COMMON.MINUTE;

        if (hours > 1 && hours < 5) {
        hoursTranslations = t.COMMON.HOURS_2_4;
        }

        if (minutes > 1 && minutes < 5) {
        minutesTranslations = t.COMMON.MINUTES_2_4;
        }

        if (hours >= 5) {
        hoursTranslations = t.COMMON.HOURS;
        }

        if (minutes >= 5) {
        minutesTranslations = t.COMMON.MINUTES;
        }

        const hoursString = hours ? `${hours} ${hoursTranslations}` : '';
        const minutesString = minutes ? `${minutes} ${minutesTranslations}` : '';

        return hoursString ? `${hoursString} ${minutesString}` : minutesString;
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
        <div className={styles.player}>
            <div className={styles.cover}>
                {/* {
                    cover && <Image src={prepareAssetUrl(cover.fields.file.url)} width={200} height={200} alt=""/>
                } */}
                <ImagePlaceholder width={200} height={200} />
            </div>
            <div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.meta}>
                    <div className={styles.actions}>
                        {isPlaying}
                        <button onClick={play} className={cx(styles.actionButton, !isPlaying ? styles.isPlaying : styles.isPaused)} aria-label="Play / Pause" />
                    </div>
                    <div>
                        <div className={styles.created}>{createdDate}</div>
                        <div className={styles.durationInMinutes}>{formattedTime()}</div>
                    </div>
                </div>
                <div className={styles.innerPlayer}>
                    {!isPlayerReady && <div className={styles.loadingAudio}>Trwa ładowanie pliku audio ({loadingProgress}%)</div>}
                    <div className={cx(styles.wave, isPlayerReady && styles.waveIsReady)} ref={player} style={{ backgroundPositionX: `${backgroundPosiiton}px`}}>
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
                                waveColor="#14A5FF"
                                autoCenter={false}
                            />
                            
                        </WaveSurfer>
                        <div className={styles.bottomProgressBar} style={{ width: `${progress}%`}}/>
                    </div>
                </div>
                <div className={styles.times}>
                    <div className={cx(styles.time, styles.currentTime)}>{formatTime(currentTime)}</div>
                    <div className={cx(styles.time)}>{formatTime(audioDuration)}</div>
                </div>
            </div>
        </div>
    )
}

export default Player;

// export default Player;
