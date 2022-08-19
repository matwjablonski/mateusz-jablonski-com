import { useMemo } from 'react';
import recommended from '../../data/recommended.json';
import { generateRandomNumbers } from '../../lib/random';
import RecommendedPodcastTile from '../RecommendedPodcastTile';

const RecommendedPodcasts = () => {
    const podcastIndexesToDisplay = generateRandomNumbers(0, recommended.podcasts.length - 1, 3);

    return podcastIndexesToDisplay.map(index => <RecommendedPodcastTile {...recommended.podcasts[index]} key={recommended.podcasts[index].name} />);
};

export default RecommendedPodcasts;