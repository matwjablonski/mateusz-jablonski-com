import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { EpisodeNumberProps, EpisodeNumberSize } from './EpisodeNumber.types';
import styles from './EpisodeNumber.module.scss';

const EpisodeNumber: FunctionComponent<EpisodeNumberProps> = ({episode, size = EpisodeNumberSize.SMALL, className}) => <div className={cx(styles.episode, styles[size], className)}>
    {`#${episode}`}
</div>;

export default EpisodeNumber;
