import Breadcrumbs from "../../components/Breadcrumbs";
import Grid from "../../components/Grid";
import PageTitle from "../../components/PageTitle";
import MainLayout from "../../layouts";
import { FC } from "react";
import podcastStyles from '../../styles/Podcast.module.scss';
import { HeadInterface } from "../../types/common/Head.types";
import { Page } from "../../types/common/Page.types";
import { GetServerSideProps } from 'next';
import { fetchEntries } from '../../contentful';
import { formatDate } from '../../utils/formatDate';
import { Podcast, PodcastEpisode } from '../../types/common/Podcast.types';
import GuestPodcastBlock from '../../components/GuestPodcastBlock';
import { useTranslations } from '../../hooks/useTranslations';
import SectionPodcast from '../../components/SectionPodcast';
import Image from 'next/image';
import prepareAssetUrl from '../../utils/prepareAssetUrl';
import MyPodcastHeader from '../../components/MyPodcastHeader';
import GuestPodcastPreview from '../../components/GuestPodcastPreview';
import PodcastSeason from '../../components/PodcastSeason';

type PodcastType = Partial<Podcast> & { seasons: { [key: string | number ]: PodcastEpisode[] }};

type Podcasts = PodcastType[];

interface PodcastPageProps {
    body: Page,
    podcastGuest: { [key: string]: Partial<PodcastEpisode>[] },
    podcasts?: Podcasts;
}

const PAGE_SIZE = 9;
const FIRST_PAGE_SIZE = PAGE_SIZE + 1;

const PodcastPage: FC<PodcastPageProps> = ({ body, podcastGuest, podcasts }) => {
    const {
        head,
        title,
        description,
    } = body;

    const { t } = useTranslations();

    console.log(podcasts)

    return (
        <MainLayout head={head ? (head.fields as HeadInterface) : {}} hideOverflow>
            <Grid>
                <Breadcrumbs />
                <PageTitle title={title} description={description}/>
                <h3 className={podcastStyles.SmallSectionTitle}>{t.PODCAST.MY_PODCASTS.TITLE}</h3>
                <div>
                    {podcasts.length > 0 && podcasts.map(podcast => (
                        <SectionPodcast key={podcast.name}>
                            <MyPodcastHeader
                                name={podcast.name}
                                authors={podcast.authors}
                                cover={podcast.cover}
                                description={podcast.description}    
                            />
                            {Object.keys(podcast.seasons).map((season) => (
                                <PodcastSeason
                                    key={`season-${season}`}
                                    season={+season}
                                    episodes={podcast.seasons[season]}
                                />
                            ))}
                        </SectionPodcast>
                    ))}
                </div>
                <h3 className={podcastStyles.SmallSectionTitle}>{t.PODCAST.GUEST_PODCASTS.TITLE}</h3>
                <SectionPodcast>
                    {Object.keys(podcastGuest).map(podcastName => (
                        <GuestPodcastBlock
                            key={podcastName}
                            title={podcastName}
                            description={podcastGuest[podcastName][0].podcast.description}
                            episodes={podcastGuest[podcastName]}
                        />
                    ))}
                </SectionPodcast>
            </Grid>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    type PodcastEpisodeWithName = Partial<Omit<PodcastEpisode, 'podcast'> & { podcastName: string }>;
    let guestPodcastsByTitle: { [key: string]: PodcastEpisodeWithName[] } = {};

    const res = await fetchEntries({
        content_type: 'page',
        'fields.slug': 'podcast',
        include: 2,
    });

    const podcastsChannelsRes = await fetchEntries({
        content_type: 'podcastChannel',
        'fields.externalPodcast': false,
        order: 'fields.name',
        select: 'fields.name,fields.description,fields.cover,fields.authors',
    });

    const podcastGuestRes = await fetchEntries({
        content_type: 'podcast',
        include: 2,
        skip: 0,
        order: '-fields.createdDate',
        'fields.createdDate[lte]': formatDate({
            dateObject: new Date(),
            formatString: 'yyyy-MM-dd HH:mm:ss'
          }),
        'fields.guestPodcast': true,
        select: 'fields.slug,fields.createdDate,fields.author,fields.episode,fields.podcast,fields.time,fields.excerpt,fields.externalLink,fields.title,fields.featuredImage',
    });

    const body = await res.data
        .map(p => ({ ...p.fields }))
        .shift();

    const fetchPodcast = async (name: string) => {
        const res = await fetchEntries({
            content_type: 'podcast',
            include: 2,
            skip: 0,
            'fields.podcast.sys.contentType.sys.id': 'podcastChannel',
            'fields.podcast.fields.name': name,
            select: 'fields.slug,fields.season,fields.title,fields.createdDate,fields.episode,fields.author,fields.featuredImage,fields.time,fields.excerpt'
        });

        const data = res.data
            .map(p => ({ 
                ...p.fields,
                createdDate: formatDate({
                    dateObject: p.fields?.createdDate,
                    formatString: 'dd MMMM yyyy'
                }),
            }))
            .sort((a, b) => b.episode - a.episode)
            .reduce((acc, curr) => {
                if (curr.season) {
                    if (!(curr.season in acc)) {
                        acc[curr.season] = [curr]
                    } else {
                        acc[curr.season].push(curr);
                    }
                } else {    
                    if (!acc[0]) {
                        acc[0] = [curr];
                    } else {
                        acc[0].push(curr);
                    }
                }

                return acc;
            }, {});

        return data;
    }

    const podcasts: Podcasts = await Promise.all(podcastsChannelsRes.data.map(async p => ({
        ...p.fields,
        authors: (p.fields.authors ?? []).map(a => ({ ...a.fields })),
        seasons: await fetchPodcast(p.fields.name),
    })))

    const podcastGuest: PodcastEpisodeWithName[] = await podcastGuestRes.data.map(p => ({
        ...p.fields,
        podcast: p.fields?.podcast?.fields || {},
        podcastName: p.fields?.podcast?.fields?.name ?? '',
        createdDate: formatDate({
            dateObject: p.fields?.createdDate,
            formatString: 'dd MMMM yyyy'
        }),
    }));

    if (podcastGuest.length > 0) {
        guestPodcastsByTitle = podcastGuest
            .reduce<{ [key: string]: PodcastEpisodeWithName[] }>((acc, curr) => {
                if (curr.podcastName in acc) {
                    acc[curr.podcastName].push(curr); 
                } else {
                    acc[curr.podcastName] = [ curr ]
                }

                return acc;
            }, {})
    }

    if (!body) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            body,
            podcasts,
            podcastGuest: guestPodcastsByTitle,
            // totalArticles: podcastGuest.total,
        }
    }
}

export default PodcastPage;
