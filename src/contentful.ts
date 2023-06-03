import {createClient, EntryCollection} from 'contentful';
import {Items} from "./models/entries.model";

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_CDA_TOKEN

const client = createClient({
  space,
  accessToken,
})

async function fetchEntries(context): Promise<{ data: Items, total: number }> {
  const entries: EntryCollection<Items> = await client.getEntries(context)

  if (entries.items) {
    return {
      data: entries.items,
      total: entries.total
    }
  }

  return null
}

async function fetchMultipleContentTypesEntries(contentTypes: string[], limit: number, locale: string): Promise<{ data: Items }> {
  const CONTENTFUL_API_URI = `https://cdn.contentful.com/spaces/${space}/entries`;
  const types = contentTypes.toString();

  const body = await fetch(
    `${CONTENTFUL_API_URI}?access_token=${accessToken}&sys.contentType.sys.id[in]=${types}&limit=${limit + 6}&include=2&locale=${locale}`
  );

  const res = await body.json();

  if (!res.items) {
    return null;
  }

  const items = res.items
    .map((item) => {
      if (item.sys.contentType.sys.id === 'article') {
        const id = item.fields.featuredImage?.sys.id;;
        if (id) {
          item.fields.featuredImage.fields = res.includes.Entry.find(entry => entry.sys.id === id)?.fields;
        } else {
          item.fields.featuredImage = null;
        }

        const imageId = item.fields.featuredImage && item.fields.featuredImage.fields.image.sys.id;

        if (imageId) {
          item.fields.featuredImage.fields.image.fields = res.includes.Asset.find(asset => asset.sys.id === imageId)?.fields;
        } else {
          item.fields.featuredImage = null;
        }
      };

      if (item.sys.contentType.sys.id === 'book') {
        const id = item.fields.cover.sys.id;

        item.fields.cover.fields = res.includes.Asset.find(asset => asset.sys.id === id)?.fields;
      }

      if (item.sys.contentType.sys.id === 'podcast') {
        if (item.fields.featuredImage) {
          const imageId = item.fields.featuredImage.sys.id;
          item.fields.featuredImage.fields = res.includes.Asset.find(asset => asset.sys.id === imageId)?.fields;
        }
      }

      return item;
    })
    .map(item => (
      {
        ...item, 
        fields: {
          ...item.fields, createdDate: item.fields.createdDate.substring(0, 10)
        }
      }
    ))
    .filter(item => new Date(item.fields.createdDate) < new Date())
    .sort((a, b) => {
      if (new Date(a.fields.createdDate) > new Date(b.fields.createdDate)) {
        return -1;
      }

      if (new Date(a.fields.createdDate) < new Date(b.fields.createdDate)) {
        return 1;
      }

      return 0;
    })
    .filter((_, i) => i < limit);

  if (items) {
    return {
      data: items
    }
  }

  return null;
}

export { fetchEntries, fetchMultipleContentTypesEntries }
