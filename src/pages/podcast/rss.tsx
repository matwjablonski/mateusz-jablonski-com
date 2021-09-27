import {GetServerSideProps, GetStaticProps} from "next";
import {fetchEntries} from '../../contentful'
import { Podcast } from "../../types/common/Podcast.types";

const Rss = () => {

}

const getPodcastsRssXml = (podcasts: Podcast[]) => {
    let rssItemsXml = "";
    podcasts.forEach(post => {
      rssItemsXml += `
        <item>
          <title>${post.title}</title>
          <link>https://mateuszjablonski.com/podcast/${post.slug}</link>
          <pubDate>${post.createdDate}</pubDate>
          <description>
          <![CDATA[${post.excerpt}]]>
          </description>
      </item>`;
    });
    return {
      rssItemsXml,
      latestPodcastDate: podcasts[0].createdDate,
    };
  };
  
  const getRssXml = (podcasts: Podcast[]) => {
    const { rssItemsXml, latestPodcastDate } = getPodcastsRssXml(podcasts);
    return `<?xml version="1.0" ?>
    <rss version="2.0">
      <channel>
          <title>Mateusz Jabłoński</title>
          <link>https://mateuszjablonski.com</link>
          <description>test</description>
          <language>pl</language>
          <lastBuildDate>${latestPodcastDate}</lastBuildDate>
          ${rssItemsXml}
      </channel>
    </rss>`;
  };
  

export const getServerSideProps = async (context) => {
    const res = context.res;
    if (!res) {
        return;
    }

    const podcastsRes = await fetchEntries({
        content_type: 'podcast',
        include: 2,
        order: '-fields.createdDate',
        limit: 5,
    });

    const blogPosts = getRssXml(podcastsRes.map(p => p.fields));
    res.setHeader("Content-Type", "text/xml");
    res.write(blogPosts);
    res.end();
  }

export default Rss;