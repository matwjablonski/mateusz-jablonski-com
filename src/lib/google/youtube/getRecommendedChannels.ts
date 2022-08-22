const { YT_API_KEY, YT_CHANNEL_SECTION_ID } = process.env;

export interface Vlog {
    name: string;
    source: string;
    image: string;
}

const prepareYTUrl = (ending: string, params: { [key: string]: string | string[]; }) => {
    const base = {
        key: YT_API_KEY
    };

    const mergedParams = {
        ...base,
        ...params,
    };

    const paramsString = Object.keys(mergedParams).reduce((prev, curr) => {
        return prev + `${curr}=${mergedParams[curr].toString()}&`
    }, '').slice(0, -1);

    return `https://www.googleapis.com/youtube/v3/${ending}?${paramsString}`;
}

export const getRecommendedChannels = async () => {

    const channelRecommendedSectionResponse = await fetch(prepareYTUrl('channelSections', {
        id: YT_CHANNEL_SECTION_ID,
        part: ['contentDetails', 'id', 'snippet'],
    }));

    const channelRecommendedSection = await channelRecommendedSectionResponse.json();

    const recommendedChannelsIds = channelRecommendedSection.items.map(item => item.contentDetails.channels);

    const recommendedChannelsResponse = await Promise.all(
        recommendedChannelsIds.map(id => fetch(prepareYTUrl('channels', {
            part: ['contentDetails', 'id', 'snippet', 'brandingSettings', 'contentOwnerDetails'],
            id,
        })))
    );

    const recommendedChannels = await Promise.all(recommendedChannelsResponse.map(r => r.json()));

    const recommendedChannelsData = await recommendedChannels[0].items.map(channelData => ({
        name: channelData.snippet.title,
        image: channelData.brandingSettings.image.bannerExternalUrl,
        source: `https://youtube.com/${channelData.snippet.customUrl}`
    }));

    return recommendedChannelsData;
}
