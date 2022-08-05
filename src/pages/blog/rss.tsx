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
                    <![CDATA[${excerpt && excerpt[0].props.children[0]}]]>
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
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Mateusz Jabłoński</title>
                <link>https://mateuszjablonski.com</link>
                <description>Artykuły, które tworzę dotyczą programowania oraz rozwoju. W większości opisuję świat frontendu, ale nie tylko. Zapraszam do czytania.</description>
                <language>pl</language>
                <atom:link href="https://mateuszjablonski.com/blog/rss" rel="self" type="application/rss+xml" />
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