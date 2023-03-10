import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {WaveForm, WaveSurfer} from 'wavesurfer-react';
import styles from './Player.module.scss';
import cx from 'classnames';
import { formatTime } from "../../utils/formatTime";
import { Asset } from "contentful";
import Image from "next/image";
import prepareAssetUrl from "../../utils/prepareAssetUrl";

interface PlayerProps {
    file: string;
    title: string;
    description: string;
    cover: Asset;
}

 const Player = ({ file, title, description, cover }: PlayerProps) => {
    const wavesurferRef = useRef<any>();
    const [backgroundPosiiton, setBackgroundPosition] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const player = useRef<HTMLDivElement>(null);

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
        wavesurferRef.current.playPause();
      }, []);

    return (
        <div className={styles.player}>
            <div className={styles.cover}>
                {
                    cover && <Image src={prepareAssetUrl(cover.fields.file.url)} width={200} height={200} alt=""/>
                }
            </div>
            <div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <button onClick={play}>Play / Pause</button>
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
