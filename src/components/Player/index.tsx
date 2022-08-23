import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {WaveForm, WaveSurfer} from 'wavesurfer-react';
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import styles from './Player.module.scss';
import cx from 'classnames';

 const Player = (file) => {
    const wavesurferRef = useRef<any>();
    const [timelineVis, setTimelineVis] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const plugins = useMemo(() => {
        return [
            timelineVis && {
                plugin: TimelinePlugin,
                options: {
                  container: "#timeline"
                }
              },
        ].filter(Boolean)}, [timelineVis]);

    const handleWSMount = useCallback((waveSurfer) => {
        wavesurferRef.current = waveSurfer;

        if (wavesurferRef.current) {
            console.log(file);
            wavesurferRef.current.load(file.file)
            wavesurferRef.current.on('ready', () => {
                setIsPlayerReady(true);
            });

            wavesurferRef.current.on('loading', (loadingValue: number) => {
                setLoadingProgress(loadingValue);
            });
            
            wavesurferRef.current.on('audioprocess', (time: number) => {
                setProgress(time / wavesurferRef.current.getDuration() * 100);
            })

            wavesurferRef.current.on('seek', (progressValue: number) => {
                setProgress(progressValue * 100);
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
            {!isPlayerReady && <div className={styles.loadingAudio}>Trwa ładowanie pliku audio ({loadingProgress}%)</div>}
            <div className={cx(styles.wave, isPlayerReady && styles.waveIsReady)} >
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

            <div id="timeline"></div>
            <button onClick={play}>Play / Pause</button>
        </div>
    )
}

export default Player;

// export default Player;