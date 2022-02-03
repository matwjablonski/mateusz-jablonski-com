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

export { fetchEntries }
