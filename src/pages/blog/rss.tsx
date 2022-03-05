import React from 'react';
import { NextPageContext } from "next";
import { fetchEntries } from '../../contentful'
import { Article } from "../../types/common/Article.types";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const getBlogRssXml = (articles: Article[]) => {
    let rssItemsXml = "";
    articles.forEach(post => {
        const excerpt = documentToReactComponents(post.excerpt, {});

        rssItemsXml += `
            <item>
                <title>${post.title}</title>
                <link>https://mateuszjablonski.com/blog/${post.slug}</link>
                <guid>https://mateuszjablonski.com/blog/${post.slug}</guid>
                <pubDate>${new Date(post.createdDate).toUTCString()}</pubDate>
                <description>
                    <![CDATA[${excerpt[0].props.children[0]}]]>
                </description>
            </item>`;
    });

    return {
      rssItemsXml,
      latestArticleDate: new Date(articles[0].createdDate).toUTCString(),
    };
};
  
const getRssXml = (articles: Article[]) => {
    const { rssItemsXml, latestArticleDate } = getBlogRssXml(articles);
    return `<?xml version="1.0" ?>
        <rss version="2.0">
            <channel>
                <title>Mateusz Jabłoński</title>
                <link>https://mateuszjablonski.com</link>
                <description>test</description>
                <language>pl</language>
                <lastBuildDate>${latestArticleDate}</lastBuildDate>
                ${rssItemsXml}
            </channel>
        </rss>
    `;
};
  

export default class Rss extends React.Component {
    static async getInitialProps({ res }: NextPageContext) {
        if (!res) {
            return;
        }
        const articlesRes = await fetchEntries({
            content_type: 'article',
            include: 2,
            order: '-fields.createdDate',
        });

        const content = getRssXml(articlesRes.data.map(p => p.fields));
        res.setHeader("Content-Type", "text/xml");
        res.write(content);
        res.end();
    }
}